from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.contacts import crud
from app.contacts.schemas import ContactsRead, ContactsUpdate
from app.core.database import get_db
from app.core.schemas import StatusResponse
from app.user.deps import get_current_admin_user
from app.user.models import User

contacts_router = APIRouter(prefix="/contacts", tags=["Контакты"])


@contacts_router.get(
    "",
    response_model=StatusResponse[ContactsRead],
    summary="Получить контактные данные",
    description="Возвращает email, телефон, адрес, часы работы и ссылку на карту.",
)
async def get_contacts(db: AsyncSession = Depends(get_db)):
    content = await crud.get_contacts(db)
    return StatusResponse(
        success=True,
        message="Контакты получены",
        data=crud.to_read(content),
    )


@contacts_router.patch(
    "",
    response_model=StatusResponse[ContactsRead],
    summary="Обновить контактные данные",
    description=(
        "Обновляет email, телефон, адрес и часы работы. "
        "map_url необязателен — если не передан, сохраняется пустая строка."
    ),
)
async def update_contacts(
    data: ContactsUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    content = await crud.update_contacts(db, data)
    return StatusResponse(
        success=True,
        message="Контакты обновлены",
        data=crud.to_read(content),
    )
