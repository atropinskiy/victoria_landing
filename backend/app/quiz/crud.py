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
    TestSummaryRead,
)

_NESTED_LOAD = selectinload(Tests.categories).selectinload(
    TestCategories.questions
).selectinload(TestQuestions.options)


def to_summary(test: Tests) -> TestSummaryRead:
    return TestSummaryRead(id=str(test.id), title=test.title)


def to_public_read(test: Tests) -> TestRead:
    return TestRead(
        id=str(test.id),
        title=test.title,
        sections=[
            SectionRead(
                id=str(category.id),
                title=category.title,
                questions=[
                    QuestionRead(
                        id=str(question.id),
                        text=question.text,
                        options=[
                            OptionRead(
                                id=str(option.id),
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
        id=str(test.id),
        title=test.title,
        sections=[
            SectionAdminRead(
                id=str(category.id),
                title=category.title,
                questions=[
                    QuestionAdminRead(
                        id=str(question.id),
                        text=question.text,
                        options=[
                            OptionAdminRead(
                                id=str(option.id),
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


async def get_tests(db: AsyncSession) -> list[Tests]:
    result = await db.execute(select(Tests).order_by(Tests.id))
    return list(result.scalars().all())


async def get_test(db: AsyncSession, test_id: int) -> Tests | None:
    result = await db.execute(
        select(Tests).options(_NESTED_LOAD).where(Tests.id == test_id)
    )
    return result.scalar_one_or_none()


async def create_test(db: AsyncSession, data: TestCreate) -> Tests:
    test = Tests(title=data.title, categories=_build_categories(data.sections))
    db.add(test)
    await db.commit()
    return await get_test(db, test.id)


async def update_test(db: AsyncSession, test_id: int, data: TestCreate) -> Tests | None:
    test = await get_test(db, test_id)
    if test is None:
        return None

    test.title = data.title
    test.categories = _build_categories(data.sections)
    await db.commit()
    return await get_test(db, test_id)


async def delete_test(db: AsyncSession, test_id: int) -> bool:
    result = await db.execute(delete(Tests).where(Tests.id == test_id))
    await db.commit()
    return result.rowcount > 0


async def submit_test(
    db: AsyncSession, test_id: int, answers: list[AnswerItem]
) -> TestResultRead | None:
    test = await get_test(db, test_id)
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
        try:
            question_id = int(answer.question_id)
            option_id = int(answer.option_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Некорректный id вопроса или ответа: "
                    f"{answer.question_id}/{answer.option_id}"
                ),
            ) from None

        if question_id in answered_questions:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"На вопрос {answer.question_id} передано больше одного ответа",
            )

        options = valid_options_by_question.get(question_id)
        if options is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Вопрос {answer.question_id} не принадлежит этому тесту",
            )

        option = options.get(option_id)
        if option is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Ответ {answer.option_id} не принадлежит вопросу {answer.question_id}",
            )

        answered_questions.add(question_id)
        scores[option.category] += option.weight

    return TestResultRead(scores=scores)
