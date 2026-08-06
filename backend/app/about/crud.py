from sqlalchemy.ext.asyncio import AsyncSession

from app.about.models import AboutContent, AboutRevision
from app.about.schemas import AboutRead, AboutUpdate
from app.core.schemas import Bilingual


def to_read(content: AboutContent) -> AboutRead:
    return AboutRead(
        promo=Bilingual(ru=content.promo_ru, en=content.promo_en),
        full=Bilingual(ru=content.full_ru, en=content.full_en),
        updated_at=content.updated_at,
    )


async def get_about(db: AsyncSession) -> AboutContent:
    return await db.get_one(AboutContent, 1)


async def update_about(db: AsyncSession, data: AboutUpdate) -> AboutContent:
    content = await db.get_one(AboutContent, 1)
    db.add(
        AboutRevision(
            promo_ru=content.promo_ru,
            promo_en=content.promo_en,
            full_ru=content.full_ru,
            full_en=content.full_en,
        )
    )
    content.promo_ru = data.promo.ru
    content.promo_en = data.promo.en
    content.full_ru = data.full.ru
    content.full_en = data.full.en
    await db.commit()
    await db.refresh(content)
    return content
