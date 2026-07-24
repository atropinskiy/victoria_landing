from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.schemas import StatusResponse
from app.services import crud
from app.services.schemas import ServiceCreate, ServiceRead

services_router = APIRouter(prefix="/services", tags=["Услуги"])

# Категории пока отключены — см. app/services/models.py.
#
# categories_router = APIRouter(prefix="/categories", tags=["Категории"])
#
#
# @categories_router.get(
#     "",
#     response_model=StatusResponse[list[CategoryRead]],
#     summary="Список категорий",
#     description=(
#         "Возвращает все категории услуг (id и название на русском/английском), "
#         "отсортированные по id. Используйте id категории как category_id "
#         "при создании услуги."
#     ),
# )
# async def get_categories(db: AsyncSession = Depends(get_db)):
#     categories = await crud.get_categories(db)
#     return StatusResponse(
#         success=True,
#         message="Категории получены",
#         data=[crud.to_category_read(category) for category in categories],
#     )
#
#
# @categories_router.post(
#     "",
#     response_model=StatusResponse[CategoryRead],
#     status_code=status.HTTP_201_CREATED,
#     summary="Создать категорию",
#     description=(
#         "Создаёт новую категорию услуг с названием на русском и английском. "
#         "Возвращает присвоенный id — используйте его как category_id при "
#         "создании услуг внутри этой категории."
#     ),
# )
# async def create_category(data: CategoryCreate, db: AsyncSession = Depends(get_db)):
#     category = await crud.create_category(db, data)
#     return StatusResponse(
#         success=True,
#         message="Категория создана",
#         data=crud.to_category_read(category),
#     )
#
#
# @categories_router.delete(
#     "/{category_id}",
#     response_model=StatusResponse[None],
#     summary="Удалить категорию",
#     description=(
#         "Удаляет категорию по id. Каскадно удаляются все услуги этой категории "
#         "и все этапы (stages) этих услуг — отдельно чистить их не нужно. "
#         "Если категория с таким id не найдена, возвращает 404."
#     ),
#     responses={404: {"description": "Категория не найдена"}},
# )
# async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
#     deleted = await crud.delete_category(db, category_id)
#     if not deleted:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Категория не найдена")
#     return StatusResponse(success=True, message="Категория удалена", data=None)


@services_router.get(
    "",
    response_model=StatusResponse[list[ServiceRead]],
    summary="Список услуг",
    description=(
        "Возвращает все услуги вместе с этапами (stages) и их пунктами (items), "
        "отсортированные по полю order."
    ),
)
async def get_services(db: AsyncSession = Depends(get_db)):
    services = await crud.get_services(db)
    return StatusResponse(
        success=True,
        message="Услуги получены",
        data=[crud.to_read(service) for service in services],
    )


@services_router.post(
    "",
    response_model=StatusResponse[ServiceRead],
    status_code=status.HTTP_201_CREATED,
    summary="Создать услугу",
    description=(
        "Создаёт услугу вместе с этапами (stages) и их пунктами (items). "
        "order передавать не нужно — новая услуга автоматически становится "
        "последней в списке. Порядок этапов в переданном массиве определяет "
        "их порядковый номер — присваивается автоматически по позиции в списке."
    ),
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
    description=(
        "Удаляет услугу по id. Каскадно удаляются все её этапы (stages) — "
        "отдельно чистить их не нужно. Если услуга с таким id не найдена, "
        "возвращает 404."
    ),
    responses={404: {"description": "Услуга не найдена"}},
)
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await crud.delete_service(db, service_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Услуга не найдена")
    return StatusResponse(success=True, message="Услуга удалена", data=None)
