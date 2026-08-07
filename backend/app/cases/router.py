from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.cases import crud
from app.cases.schemas import CaseOrderItem, CaseRead
from app.core.database import get_db
from app.core.schemas import Bilingual, StatusResponse
from app.media.service import save_upload
from app.user.deps import get_current_user
from app.user.models import User

cases_router = APIRouter(prefix="/cases", tags=["Кейсы"])


@cases_router.get(
    "",
    response_model=StatusResponse[list[CaseRead]],
    summary="Список кейсов",
    description="Возвращает все кейсы, отсортированные по полю order.",
)
async def get_cases(db: AsyncSession = Depends(get_db)):
    cases = await crud.get_cases(db)
    return StatusResponse(
        success=True,
        message="Кейсы получены",
        data=[crud.to_read(case) for case in cases],
    )


@cases_router.post(
    "",
    response_model=StatusResponse[CaseRead],
    status_code=status.HTTP_201_CREATED,
    summary="Создать кейс",
    description=(
        "Создаёт кейс. Принимает multipart/form-data: текстовые поля названия/описания "
        "на русском и английском и файл изображения (jpg/jpeg/png/webp/avif/gif/svg, до 10 МБ). "
        "order передавать не нужно — новый кейс автоматически становится последним в списке."
    ),
)
async def create_case(
    title_ru: Annotated[str, Form()],
    title_en: Annotated[str, Form()],
    description_ru: Annotated[str, Form()],
    description_en: Annotated[str, Form()],
    image: Annotated[UploadFile | None, File()] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image_url = await save_upload(image) if image is not None else None
    case = await crud.create_case(
        db,
        title=Bilingual(ru=title_ru, en=title_en),
        description=Bilingual(ru=description_ru, en=description_en),
        image=image_url,
    )
    return StatusResponse(
        success=True,
        message="Кейс создан",
        data=crud.to_read(case),
    )


@cases_router.put(
    "/reorder",
    response_model=StatusResponse[list[CaseRead]],
    summary="Изменить порядок кейсов",
    description=(
        "Принимает массив {id, order} — по одному объекту на каждый существующий "
        "кейс — и проставляет order каждому кейсу по его id. Ожидается, что "
        "фронт всегда присылает записи целиком (все кейсы разом). "
        "Если среди переданных id есть несуществующий, ничего не меняется и "
        "возвращается 404."
    ),
    responses={404: {"description": "Один или несколько кейсов не найдены"}},
)
async def reorder_cases(
    items: list[CaseOrderItem],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cases = await crud.reorder_cases(db, items)
    if cases is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Один или несколько кейсов не найдены",
        )
    return StatusResponse(
        success=True,
        message="Порядок обновлён",
        data=[crud.to_read(case) for case in cases],
    )


@cases_router.patch(
    "/{case_id}",
    response_model=StatusResponse[CaseRead],
    summary="Обновить кейс",
    description=(
        "Обновляет название, описание и (опционально) изображение кейса по id. "
        "Принимает multipart/form-data, как и создание. Файл изображения необязателен — "
        "если не передан, текущая картинка остаётся без изменений; если передан, старый "
        "файл удаляется. order не меняется. Если кейс с таким id не найден, возвращает 404."
    ),
    responses={404: {"description": "Кейс не найден"}},
)
async def update_case(
    case_id: int,
    title_ru: Annotated[str, Form()],
    title_en: Annotated[str, Form()],
    description_ru: Annotated[str, Form()],
    description_en: Annotated[str, Form()],
    image: Annotated[UploadFile | None, File()] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image_url = await save_upload(image) if image is not None else None
    case = await crud.update_case(
        db,
        case_id,
        title=Bilingual(ru=title_ru, en=title_en),
        description=Bilingual(ru=description_ru, en=description_en),
        image=image_url,
    )
    if case is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Кейс не найден")
    return StatusResponse(
        success=True,
        message="Кейс обновлён",
        data=crud.to_read(case),
    )


@cases_router.delete(
    "/{case_id}",
    response_model=StatusResponse[None],
    summary="Удалить кейс",
    description=(
        "Удаляет кейс по id вместе с его файлом изображения. "
        "Если кейс с таким id не найден, возвращает 404."
    ),
    responses={404: {"description": "Кейс не найден"}},
)
async def delete_case(
    case_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = await crud.delete_case(db, case_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Кейс не найден")
    return StatusResponse(success=True, message="Кейс удалён", data=None)
