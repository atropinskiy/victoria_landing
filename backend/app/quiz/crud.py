from fastapi import HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.quiz.models import TestCategories, TestOptions, TestQuestions, Tests
from app.quiz.schemas import (
    AnswerItem,
    OptionAdminRead,
    OptionRead,
    QuestionAdminRead,
    QuestionRead,
    SectionAdminRead,
    SectionRead,
    TestAdminRead,
    TestCreate,
    TestRead,
    TestResultRead,
)
from app.user.models import User

_NESTED_LOAD = selectinload(Tests.categories).selectinload(
    TestCategories.questions
).selectinload(TestQuestions.options)


def to_public_read(test: Tests) -> TestRead:
    return TestRead(
        id=test.id,
        title=test.title,
        sections=[
            SectionRead(
                id=category.id,
                title=category.title,
                questions=[
                    QuestionRead(
                        id=question.id,
                        text=question.text,
                        options=[
                            OptionRead(
                                id=option.id,
                                text=option.text,
                                category=option.category,
                            )
                            for option in question.options
                        ],
                    )
                    for question in category.questions
                ],
            )
            for category in test.categories
        ],
    )


def to_admin_read(test: Tests) -> TestAdminRead:
    return TestAdminRead(
        id=test.id,
        title=test.title,
        sections=[
            SectionAdminRead(
                id=category.id,
                title=category.title,
                questions=[
                    QuestionAdminRead(
                        id=question.id,
                        text=question.text,
                        options=[
                            OptionAdminRead(
                                id=option.id,
                                text=option.text,
                                category=option.category,
                                weight=option.weight,
                            )
                            for option in question.options
                        ],
                    )
                    for question in category.questions
                ],
            )
            for category in test.categories
        ],
    )


def _build_categories(sections: list) -> list[TestCategories]:
    return [
        TestCategories(
            order=cat_index,
            title=section.title,
            questions=[
                TestQuestions(
                    order=q_index,
                    text=question.text,
                    options=[
                        TestOptions(
                            order=o_index,
                            text=option.text,
                            weight=option.weight,
                            category=option.category,
                        )
                        for o_index, option in enumerate(question.options)
                    ],
                )
                for q_index, question in enumerate(section.questions)
            ],
        )
        for cat_index, section in enumerate(sections)
    ]


async def get_test(db: AsyncSession) -> Tests | None:
    result = await db.execute(
        select(Tests).options(_NESTED_LOAD).order_by(Tests.id).limit(1)
    )
    return result.scalars().first()


async def create_test(db: AsyncSession, data: TestCreate) -> Tests:
    test = Tests(title=data.title, categories=_build_categories(data.sections))
    db.add(test)
    await db.commit()
    return await get_test(db)


async def update_test(db: AsyncSession, data: TestCreate) -> Tests | None:
    test = await get_test(db)
    if test is None:
        return None

    test.title = data.title
    test.categories = _build_categories(data.sections)
    await db.commit()
    return await get_test(db)


async def delete_test(db: AsyncSession) -> bool:
    result = await db.execute(delete(Tests))
    await db.commit()
    return result.rowcount > 0


async def submit_test(
    db: AsyncSession, answers: list[AnswerItem], current_user: User | None = None
) -> TestResultRead | None:
    test = await get_test(db)
    if test is None:
        return None

    valid_options_by_question: dict[int, dict[int, TestOptions]] = {}
    all_categories: set[str] = set()
    for category in test.categories:
        for question in category.questions:
            valid_options_by_question[question.id] = {
                option.id: option for option in question.options
            }
            for option in question.options:
                all_categories.add(option.category)

    scores = dict.fromkeys(all_categories, 0)
    answered_questions: set[int] = set()

    for answer in answers:
        if answer.question_id in answered_questions:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"На вопрос {answer.question_id} передано больше одного ответа",
            )

        options = valid_options_by_question.get(answer.question_id)
        if options is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Вопрос {answer.question_id} не принадлежит этому тесту",
            )

        option = options.get(answer.option_id)
        if option is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Ответ {answer.option_id} не принадлежит вопросу {answer.question_id}",
            )

        answered_questions.add(answer.question_id)
        scores[option.category] += option.weight

    if current_user is not None:
        current_user.test_result = scores
        await db.commit()

    return TestResultRead(scores=scores)
