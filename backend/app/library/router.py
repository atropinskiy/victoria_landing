from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.schemas import Bilingual, StatusResponse
from app.library import crud
from app.library.schemas import LibraryOrderItem, LibraryRead
from app.media.service import DOCUMENT_EXTENSIONS, IMAGE_EXTENSIONS, save_upload
from app.user.deps import get_current_user
from app.user.models import User

library_router = APIRouter(prefix="/library", tags=["Библиотека"])


@library_router.get(
    "",
    response_model=StatusResponse[list[LibraryRead]],
    summary="Список материалов библиотеки",
    description="Возвращает все материалы библиотеки, отсортированные по полю order.",
)
async def get_library(db: AsyncSession = Depends(get_db)):
    items = await crud.get_library(db)
    return StatusResponse(
        success=True,
        message="Материалы получены",
        data=[crud.to_read(item) for item in items],
    )


@library_router.post(
    "",
    response_model=StatusResponse[LibraryRead],
    status_code=status.HTTP_201_CREATED,
    summary="Добавить материал",
    description=(
        "Добавляет материал библиотеки. Принимает multipart/form-data: текстовые поля "
        "названия/описания на русском и английском, файл обложки "
        "(jpg/jpeg/png/webp/avif/gif/svg, до 10 МБ) и файл документа "
        "(pdf/doc/docx/xls/xlsx/ppt/pptx, до 10 МБ) — оба необязательны. "
        "order передавать не нужно — новый материал автоматически становится последним в списке."
    ),
)
async def create_library_item(
    title_ru: Annotated[str, Form()],
    title_en: Annotated[str, Form()],
    description_ru: Annotated[str, Form()],
    description_en: Annotated[str, Form()],
    image: Annotated[UploadFile | None, File()] = None,
    document: Annotated[UploadFile | None, File()] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image_url = await save_upload(image, IMAGE_EXTENSIONS) if image is not None else None
    document_url = (
        await save_upload(document, DOCUMENT_EXTENSIONS) if document is not None else None
    )
    item = await crud.create_item(
        db,
        title=Bilingual(ru=title_ru, en=title_en),
        description=Bilingual(ru=description_ru, en=description_en),
        image=image_url,
        document=document_url,
    )
    return StatusResponse(
        success=True,
        message="Материал добавлен",
        data=crud.to_read(item),
    )


@library_router.put(
    "/reorder",
    response_model=StatusResponse[list[LibraryRead]],
    summary="Изменить порядок материалов",
    description=(
        "Принимает массив {id, order} — по одному объекту на каждый существующий "
        "материал — и проставляет order каждому по его id. Ожидается, что фронт "
        "всегда присылает записи целиком (все материалы разом). Если среди "
        "переданных id есть несуществующий, ничего не меняется и возвращается 404."
    ),
    responses={404: {"description": "Один или несколько материалов не найдены"}},
)
async def reorder_library(
    items: list[LibraryOrderItem],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rows = await crud.reorder_library(db, items)
    if rows is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Один или несколько материалов не найдены",
        )
    return StatusResponse(
        success=True,
        message="Порядок обновлён",
        data=[crud.to_read(item) for item in rows],
    )


@library_router.patch(
    "/{item_id}",
    response_model=StatusResponse[LibraryRead],
    summary="Обновить материал",
    description=(
        "Обновляет название, описание и (опционально) обложку/документ материала по id. "
        "Принимает multipart/form-data, как и создание. Файлы необязательны — если не "
        "переданы, текущие остаются без изменений; если переданы, старые файлы удаляются. "
        "order не меняется. Если материал с таким id не найден, возвращает 404."
    ),
    responses={404: {"description": "Материал не найден"}},
)
async def update_library_item(
    item_id: int,
    title_ru: Annotated[str, Form()],
    title_en: Annotated[str, Form()],
    description_ru: Annotated[str, Form()],
    description_en: Annotated[str, Form()],
    image: Annotated[UploadFile | None, File()] = None,
    document: Annotated[UploadFile | None, File()] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image_url = await save_upload(image, IMAGE_EXTENSIONS) if image is not None else None
    document_url = (
        await save_upload(document, DOCUMENT_EXTENSIONS) if document is not None else None
    )
    item = await crud.update_item(
        db,
        item_id,
        title=Bilingual(ru=title_ru, en=title_en),
        description=Bilingual(ru=description_ru, en=description_en),
        image=image_url,
        document=document_url,
    )
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Материал не найден")
    return StatusResponse(
        success=True,
        message="Материал обновлён",
        data=crud.to_read(item),
    )


@library_router.delete(
    "/{item_id}",
    response_model=StatusResponse[None],
    summary="Удалить материал",
    description=(
        "Удаляет материал по id вместе с его файлами (обложка и документ). "
        "Если материал с таким id не найден, возвращает 404."
    ),
    responses={404: {"description": "Материал не найден"}},
)
async def delete_library_item(
    item_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = await crud.delete_item(db, item_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Материал не найден")
    return StatusResponse(success=True, message="Материал удалён", data=None)
