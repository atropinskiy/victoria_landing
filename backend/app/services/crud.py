from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.services.models import Categories, Services, Stages
from app.services.schemas import (
    Approach,
    Bilingual,
    CategoryCreate,
    CategoryRead,
    CategoryServices,
    ServiceCreate,
    ServiceRead,
    StageRead,
)


def to_category_read(category: Categories) -> CategoryRead:
    return CategoryRead(
        id=category.id,
        title=Bilingual(ru=category.ru_descr, en=category.en_descr),
    )


async def get_categories(db: AsyncSession) -> list[Categories]:
    result = await db.execute(select(Categories).order_by(Categories.id))
    return list(result.scalars().all())


async def create_category(db: AsyncSession, data: CategoryCreate) -> Categories:
    category = Categories(ru_descr=data.title.ru, en_descr=data.title.en)
    db.add(category)
    await db.commit()
    await db.refresh(category)
    return category


async def delete_category(db: AsyncSession, category_id: int) -> bool:
    result = await db.execute(delete(Categories).where(Categories.id == category_id))
    await db.commit()
    return result.rowcount > 0


def to_read(service: Services) -> ServiceRead:
    return ServiceRead(
        id=service.id,
        order=service.order,
        title=Bilingual(ru=service.title_ru, en=service.title_en),
        approach=Approach(
            title=Bilingual(ru=service.appr_title_ru, en=service.appr_title_en),
            text=Bilingual(ru=service.ru_descr, en=service.en_descr),
        ),
        stages=[
            StageRead(
                title=Bilingual(ru=stage.title_ru, en=stage.title_en),
                items=[Bilingual(**item) for item in stage.items],
            )
            for stage in service.stages
        ],
    )


async def get_categories_with_services(db: AsyncSession) -> list[Categories]:
    result = await db.execute(
        select(Categories)
        .options(selectinload(Categories.services).selectinload(Services.stages))
        .order_by(Categories.id)
    )
    return list(result.scalars().all())


def to_category_services(category: Categories) -> CategoryServices:
    return CategoryServices(
        category_id=category.id,
        category_name=Bilingual(ru=category.ru_descr, en=category.en_descr),
        services=[
            to_read(service)
            for service in sorted(category.services, key=lambda s: s.order)
        ],
    )


async def create_service(db: AsyncSession, data: ServiceCreate) -> Services:
    service = Services(
        category_id=data.category_id,
        order=data.order,
        title_ru=data.title.ru,
        title_en=data.title.en,
        appr_title_ru=data.approach.title.ru,
        appr_title_en=data.approach.title.en,
        ru_descr=data.approach.text.ru,
        en_descr=data.approach.text.en,
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
    await db.commit()
    await db.refresh(service, attribute_names=["stages"])
    return service


async def delete_service(db: AsyncSession, service_id: int) -> bool:
    result = await db.execute(delete(Services).where(Services.id == service_id))
    await db.commit()
    return result.rowcount > 0
