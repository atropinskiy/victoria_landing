from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.cases.models import Cases
from app.cases.schemas import CaseOrderItem, CaseRead
from app.core.schemas import Bilingual
from app.media.service import delete_upload


async def _commit_or_400(db: AsyncSession) -> None:
    try:
        await db.commit()
    except IntegrityError as err:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Кейс с таким названием уже существует",
        ) from err


def to_read(case: Cases) -> CaseRead:
    return CaseRead(
        id=case.id,
        order=case.order,
        title=Bilingual(ru=case.title_ru, en=case.title_en),
        description=Bilingual(ru=case.ru_descr, en=case.en_descr),
        image=case.image,
    )


async def get_cases(db: AsyncSession) -> list[Cases]:
    result = await db.execute(select(Cases).order_by(Cases.order))
    return list(result.scalars().all())


async def create_case(
    db: AsyncSession, title: Bilingual, description: Bilingual, image: str | None
) -> Cases:
    next_order = await db.scalar(select(func.coalesce(func.max(Cases.order), 0)))
    case = Cases(
        order=next_order + 1,
        title_ru=title.ru,
        title_en=title.en,
        ru_descr=description.ru,
        en_descr=description.en,
        image=image,
    )
    db.add(case)
    await _commit_or_400(db)
    await db.refresh(case)
    return case


async def update_case(
    db: AsyncSession,
    case_id: int,
    title: Bilingual,
    description: Bilingual,
    image: str | None,
) -> Cases | None:
    result = await db.execute(select(Cases).where(Cases.id == case_id))
    case = result.scalar_one_or_none()
    if case is None:
        return None

    old_image = case.image
    case.title_ru = title.ru
    case.title_en = title.en
    case.ru_descr = description.ru
    case.en_descr = description.en
    if image is not None:
        case.image = image
    await _commit_or_400(db)
    await db.refresh(case)

    # Новый файл сохранён и подтверждён — старый больше не нужен.
    if image is not None and old_image:
        delete_upload(old_image)

    return case


async def reorder_cases(db: AsyncSession, items: list[CaseOrderItem]) -> list[Cases] | None:
    order_by_id = {item.id: item.order for item in items}
    result = await db.execute(select(Cases).where(Cases.id.in_(order_by_id)))
    cases = list(result.scalars().all())
    if len(cases) != len(order_by_id):
        return None

    for case in cases:
        case.order = order_by_id[case.id]
    await db.commit()
    cases.sort(key=lambda case: case.order)
    return cases


async def delete_case(db: AsyncSession, case_id: int) -> bool:
    result = await db.execute(select(Cases).where(Cases.id == case_id))
    case = result.scalar_one_or_none()
    if case is None:
        return False

    image = case.image
    await db.delete(case)
    await db.commit()

    if image:
        delete_upload(image)

    return True
