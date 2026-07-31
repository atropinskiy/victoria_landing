from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.schemas import StatusResponse
from app.quiz import crud
from app.quiz.schemas import (
    TestAdminRead,
    TestCreate,
    TestRead,
    TestResultRead,
    TestSubmitRequest,
)
from app.user.deps import get_current_user
from app.user.models import User

quiz_router = APIRouter(prefix="/tests", tags=["Тесты"])


@quiz_router.get(
    "",
    response_model=StatusResponse[list[TestRead]],
    summary="Список тестов",
    description=(
        "Возвращает все тесты целиком: секции, вопросы и варианты ответов. "
        "Вес (баллы) вариантов ответа в этом ответе не передаётся."
    ),
)
async def get_tests(db: AsyncSession = Depends(get_db)):
    tests = await crud.get_tests(db)
    return StatusResponse(
        success=True,
        message="Тесты получены",
        data=[crud.to_public_read(test) for test in tests],
    )


@quiz_router.get(
    "/{test_id}",
    response_model=StatusResponse[TestRead],
    summary="Получить тест",
    description=(
        "Возвращает тест целиком: секции, вопросы и варианты ответов. "
        "Вес (баллы) вариантов ответа в этом ответе не передаётся. "
        "Если тест с таким id не найден, возвращает 404."
    ),
    responses={404: {"description": "Тест не найден"}},
)
async def get_test(test_id: int, db: AsyncSession = Depends(get_db)):
    test = await crud.get_test(db, test_id)
    if test is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Тест не найден"
        )
    return StatusResponse(
        success=True, message="Тест получен", data=crud.to_public_read(test)
    )


@quiz_router.post(
    "",
    response_model=StatusResponse[TestAdminRead],
    status_code=status.HTTP_201_CREATED,
    summary="Создать тест",
    description=(
        "Создаёт тест целиком вместе с секциями, вопросами и вариантами ответов "
        "(включая вес каждого варианта). Порядок секций/вопросов/вариантов в "
        "переданных массивах определяет их порядок отображения."
    ),
)
async def create_test(
    data: TestCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    test = await crud.create_test(db, data)
    return StatusResponse(
        success=True, message="Тест создан", data=crud.to_admin_read(test)
    )


@quiz_router.patch(
    "/{test_id}",
    response_model=StatusResponse[TestAdminRead],
    summary="Обновить тест",
    description=(
        "Обновляет название и полностью заменяет секции/вопросы/варианты ответов "
        "теста по id. Если тест с таким id не найден, возвращает 404."
    ),
    responses={404: {"description": "Тест не найден"}},
)
async def update_test(
    test_id: int,
    data: TestCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    test = await crud.update_test(db, test_id, data)
    if test is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Тест не найден"
        )
    return StatusResponse(
        success=True, message="Тест обновлён", data=crud.to_admin_read(test)
    )


@quiz_router.delete(
    "/{test_id}",
    response_model=StatusResponse[None],
    summary="Удалить тест",
    description=(
        "Удаляет тест по id. Каскадно удаляются все его секции, вопросы и "
        "варианты ответов. Если тест с таким id не найден, возвращает 404."
    ),
    responses={404: {"description": "Тест не найден"}},
)
async def delete_test(
    test_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = await crud.delete_test(db, test_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Тест не найден"
        )
    return StatusResponse(success=True, message="Тест удалён", data=None)


@quiz_router.post(
    "/{test_id}/submit",
    response_model=StatusResponse[TestResultRead],
    summary="Отправить ответы и получить баллы",
    description=(
        "Публичная ручка: принимает по одному выбранному варианту ответа на "
        "каждый вопрос и возвращает сумму баллов (weight) по каждой категории "
        "результата. Если тест не найден — 404. Если передан несуществующий "
        "вопрос/вариант или на один вопрос передано больше одного ответа — 400."
    ),
    responses={
        404: {"description": "Тест не найден"},
        400: {"description": "Некорректные ответы"},
    },
)
async def submit_test(
    test_id: int, data: TestSubmitRequest, db: AsyncSession = Depends(get_db)
):
    result = await crud.submit_test(db, test_id, data.answers)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Тест не найден"
        )
    return StatusResponse(success=True, message="Баллы посчитаны", data=result)
