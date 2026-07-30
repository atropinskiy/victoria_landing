from fastapi import HTTPException, status
from sqlalchemy import delete, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.services.models import Services, Stages
from app.services.schemas import (
    Bilingual,
    ServiceCreate,
    ServiceOrderItem,
    ServiceRead,
    StageRead,
)

# Категории пока отключены — см. app/services/models.py.
#
# def to_category_read(category: Categories) -> CategoryRead:
#     return CategoryRead(
#         id=category.id,
#         title=Bilingual(ru=category.ru_descr, en=category.en_descr),
#     )
#
#
# async def get_categories(db: AsyncSession) -> list[Categories]:
#     result = await db.execute(select(Categories).order_by(Categories.id))
#     return list(result.scalars().all())
#
#
# async def create_category(db: AsyncSession, data: CategoryCreate) -> Categories:
#     category = Categories(ru_descr=data.title.ru, en_descr=data.title.en)
#     db.add(category)
#     await db.commit()
#     await db.refresh(category)
#     return category
#
#
# async def delete_category(db: AsyncSession, category_id: int) -> bool:
#     result = await db.execute(delete(Categories).where(Categories.id == category_id))
#     await db.commit()
#     return result.rowcount > 0


async def _commit_or_400(db: AsyncSession) -> None:
    try:
        await db.commit()
    except IntegrityError as err:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Услуга с таким названием уже существует",
        ) from err


def to_read(service: Services) -> ServiceRead:
    return ServiceRead(
        id=service.id,
        order=service.order,
        title=Bilingual(ru=service.title_ru, en=service.title_en),
        description=Bilingual(ru=service.ru_descr, en=service.en_descr),
        stages=[
            StageRead(
                title=Bilingual(ru=stage.title_ru, en=stage.title_en),
                items=[Bilingual(**item) for item in stage.items],
            )
            for stage in service.stages
        ],
    )


async def get_services(db: AsyncSession) -> list[Services]:
    result = await db.execute(
        select(Services)
        .options(selectinload(Services.stages))
        .order_by(Services.order)
    )
    return list(result.scalars().all())


async def create_service(db: AsyncSession, data: ServiceCreate) -> Services:
    next_order = await db.scalar(select(func.coalesce(func.max(Services.order), 0)))
    service = Services(
        order=next_order + 1,
        title_ru=data.title.ru,
        title_en=data.title.en,
        ru_descr=data.description.ru,
        en_descr=data.description.en,
        stages=[
            Stages(
                order=index,
                title_ru=stage.title.ru,
                title_en=stage.title.en,
                items=[item.model_dump() for item in stage.items],
            )
            for index, stage in enumerate(data.stages)
        ],
    )
    db.add(service)
    await _commit_or_400(db)
    await db.refresh(service, attribute_names=["stages"])
    return service


async def update_service(db: AsyncSession, service_id: int, data: ServiceCreate) -> Services | None:
    result = await db.execute(
        select(Services)
        .options(selectinload(Services.stages))
        .where(Services.id == service_id)
    )
    service = result.scalar_one_or_none()
    if service is None:
        return None

    service.title_ru = data.title.ru
    service.title_en = data.title.en
    service.ru_descr = data.description.ru
    service.en_descr = data.description.en
    service.stages = [
        Stages(
            order=index,
            title_ru=stage.title.ru,
            title_en=stage.title.en,
            items=[item.model_dump() for item in stage.items],
        )
        for index, stage in enumerate(data.stages)
    ]
    await _commit_or_400(db)
    await db.refresh(service, attribute_names=["stages"])
    return service


async def reorder_services(
    db: AsyncSession, items: list[ServiceOrderItem]
) -> list[Services] | None:
    order_by_id = {item.id: item.order for item in items}
    result = await db.execute(
        select(Services)
        .options(selectinload(Services.stages))
        .where(Services.id.in_(order_by_id))
    )
    services = list(result.scalars().all())
    if len(services) != len(order_by_id):
        return None

    for service in services:
        service.order = order_by_id[service.id]
    await db.commit()
    services.sort(key=lambda service: service.order)
    return services


async def delete_service(db: AsyncSession, service_id: int) -> bool:
    result = await db.execute(delete(Services).where(Services.id == service_id))
    await db.commit()
    return result.rowcount > 0
