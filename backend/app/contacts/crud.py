from sqlalchemy.ext.asyncio import AsyncSession

from app.contacts.models import ContactsContent
from app.contacts.schemas import ContactsRead, ContactsUpdate


def to_read(content: ContactsContent) -> ContactsRead:
    return ContactsRead(
        email=content.email,
        phone=content.phone,
        address=content.address,
        hours=content.hours,
        map_url=content.map_url,
    )


async def get_contacts(db: AsyncSession) -> ContactsContent:
    return await db.get_one(ContactsContent, 1)


async def update_contacts(db: AsyncSession, data: ContactsUpdate) -> ContactsContent:
    content = await db.get_one(ContactsContent, 1)
    content.email = data.email
    content.phone = data.phone
    content.address = data.address
    content.hours = data.hours
    content.map_url = data.map_url
    await db.commit()
    await db.refresh(content)
    return content
