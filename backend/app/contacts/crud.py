from sqlalchemy.ext.asyncio import AsyncSession

from app.contacts.models import ContactsContent
from app.contacts.schemas import ContactsRead, ContactsUpdate
from app.core.schemas import Bilingual


def to_read(content: ContactsContent) -> ContactsRead:
    return ContactsRead(
        email=content.email,
        phone=content.phone,
        address=Bilingual(ru=content.address_ru, en=content.address_en),
        hours=Bilingual(ru=content.hours_ru, en=content.hours_en),
        map_url=content.map_url,
    )


async def get_contacts(db: AsyncSession) -> ContactsContent:
    return await db.get_one(ContactsContent, 1)


async def update_contacts(db: AsyncSession, data: ContactsUpdate) -> ContactsContent:
    content = await db.get_one(ContactsContent, 1)
    content.email = data.email
    content.phone = data.phone
    content.address_ru = data.address.ru
    content.address_en = data.address.en
    content.hours_ru = data.hours.ru
    content.hours_en = data.hours.en
    content.map_url = data.map_url
    await db.commit()
    await db.refresh(content)
    return content
