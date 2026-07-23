from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.schemas import StatusResponse
from app.services import crud
from app.services.schemas import (
    CategoryCreate,
    CategoryRead,
    CategoryServices,
    ServiceCreate,
    ServiceRead,
)

categories_router = APIRouter(prefix="/categories", tags=["Категории"])
services_router = APIRouter(prefix="/services", tags=["Услуги"])


@categories_router.get(
    "",
    response_model=StatusResponse[list[CategoryRead]],
    summary="Список категорий",
    description="Возвращает все категории услуг.",
)
async def get_categories(db: AsyncSession = Depends(get_db)):
    categories = await crud.get_categories(db)
    return StatusResponse(
        success=True,
        message="Категории получены",
        data=[crud.to_category_read(category) for category in categories],
    )


@categories_router.post(
    "",
    response_model=StatusResponse[CategoryRead],
    status_code=status.HTTP_201_CREATED,
    summary="Создать категорию",
    description="Создаёт категорию услуг.",
)
async def create_category(data: CategoryCreate, db: AsyncSession = Depends(get_db)):
    category = await crud.create_category(db, data)
    return StatusResponse(
        success=True,
        message="Категория создана",
        data=crud.to_category_read(category),
    )


@categories_router.delete(
    "/{category_id}",
    response_model=StatusResponse[None],
    summary="Удалить категорию",
    description="Удаляет категорию вместе со всеми её услугами и этапами (каскадно).",
)
async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await crud.delete_category(db, category_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Категория не найдена")
    return StatusResponse(success=True, message="Категория удалена", data=None)


@services_router.get(
    "",
    response_model=StatusResponse[list[CategoryServices]],
    summary="Список услуг",
    description="Возвращает все категории, а внутри каждой — её услуги вместе с этапами (stages) и их пунктами.",
)
async def get_services(db: AsyncSession = Depends(get_db)):
    categories = await crud.get_categories_with_services(db)
    return StatusResponse(
        success=True,
        message="Услуги получены",
        data=[crud.to_category_services(category) for category in categories],
    )


@services_router.post(
    "",
    response_model=StatusResponse[ServiceRead],
    status_code=status.HTTP_201_CREATED,
    summary="Создать услугу",
    description="Создаёт услугу вместе с этапами (stages) и их пунктами.",
)
async def create_service(data: ServiceCreate, db: AsyncSession = Depends(get_db)):
    service = await crud.create_service(db, data)
    return StatusResponse(
        success=True,
        message="Услуга создана",
        data=crud.to_read(service),
    )


@services_router.delete(
    "/{service_id}",
    response_model=StatusResponse[None],
    summary="Удалить услугу",
    description="Удаляет услугу вместе со всеми её этапами (каскадно).",
)
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await crud.delete_service(db, service_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Услуга не найдена")
    return StatusResponse(success=True, message="Услуга удалена", data=None)
