from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.about import crud
from app.about.schemas import AboutRead, AboutUpdate
from app.core.database import get_db
from app.core.schemas import StatusResponse
from app.user.deps import get_current_user
from app.user.models import User

about_router = APIRouter(prefix="/about", tags=["Обо мне"])


@about_router.get(
    "",
    response_model=StatusResponse[AboutRead],
    summary="Получить содержимое вкладки «Обо мне»",
    description=(
        "Возвращает промо-текст (тизер на главной) и полный текст страницы "
        "«Обо мне» на русском и английском."
    ),
)
async def get_about(db: AsyncSession = Depends(get_db)):
    content = await crud.get_about(db)
    return StatusResponse(
        success=True,
        message="Контент получен",
        data=crud.to_read(content),
    )


@about_router.patch(
    "",
    response_model=StatusResponse[AboutRead],
    summary="Обновить содержимое вкладки «Обо мне»",
    description=(
        "Обновляет промо-текст и полный текст на русском и английском. "
        "HTML санитизируется на сервере. Предыдущая версия сохраняется в историю ревизий."
    ),
)
async def update_about(
    data: AboutUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    content = await crud.update_about(db, data)
    return StatusResponse(
        success=True,
        message="Контент обновлён",
        data=crud.to_read(content),
    )
