from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.schemas import Bilingual
from app.library.models import Library
from app.library.schemas import LibraryOrderItem, LibraryRead
from app.media.service import delete_upload


async def _commit_or_400(db: AsyncSession) -> None:
    try:
        await db.commit()
    except IntegrityError as err:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Материал с таким названием уже существует",
        ) from err


def to_read(item: Library) -> LibraryRead:
    return LibraryRead(
        id=item.id,
        order=item.order,
        title=Bilingual(ru=item.title_ru, en=item.title_en),
        description=Bilingual(ru=item.ru_descr, en=item.en_descr),
        image=item.image,
        document=item.document,
    )


async def get_library(db: AsyncSession) -> list[Library]:
    result = await db.execute(select(Library).order_by(Library.order))
    return list(result.scalars().all())


async def create_item(
    db: AsyncSession,
    title: Bilingual,
    description: Bilingual,
    image: str | None,
    document: str | None,
) -> Library:
    next_order = await db.scalar(select(func.coalesce(func.max(Library.order), 0)))
    item = Library(
        order=next_order + 1,
        title_ru=title.ru,
        title_en=title.en,
        ru_descr=description.ru,
        en_descr=description.en,
        image=image,
        document=document,
    )
    db.add(item)
    await _commit_or_400(db)
    await db.refresh(item)
    return item


async def update_item(
    db: AsyncSession,
    item_id: int,
    title: Bilingual,
    description: Bilingual,
    image: str | None,
    document: str | None,
) -> Library | None:
    result = await db.execute(select(Library).where(Library.id == item_id))
    item = result.scalar_one_or_none()
    if item is None:
        return None

    old_image = item.image
    old_document = item.document
    item.title_ru = title.ru
    item.title_en = title.en
    item.ru_descr = description.ru
    item.en_descr = description.en
    if image is not None:
        item.image = image
    if document is not None:
        item.document = document
    await _commit_or_400(db)
    await db.refresh(item)

    # Новые файлы сохранены и подтверждены — старые больше не нужны.
    if image is not None and old_image:
        delete_upload(old_image)
    if document is not None and old_document:
        delete_upload(old_document)

    return item


async def reorder_library(db: AsyncSession, items: list[LibraryOrderItem]) -> list[Library] | None:
    order_by_id = {entry.id: entry.order for entry in items}
    result = await db.execute(select(Library).where(Library.id.in_(order_by_id)))
    rows = list(result.scalars().all())
    if len(rows) != len(order_by_id):
        return None

    for row in rows:
        row.order = order_by_id[row.id]
    await db.commit()
    rows.sort(key=lambda row: row.order)
    return rows


async def delete_item(db: AsyncSession, item_id: int) -> bool:
    result = await db.execute(select(Library).where(Library.id == item_id))
    item = result.scalar_one_or_none()
    if item is None:
        return False

    image, document = item.image, item.document
    await db.delete(item)
    await db.commit()

    if image:
        delete_upload(image)
    if document:
        delete_upload(document)

    return True
