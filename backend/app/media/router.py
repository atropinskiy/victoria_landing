from fastapi import APIRouter, Depends, UploadFile, status
from fastapi.responses import FileResponse

from app.core.schemas import StatusResponse
from app.media.schemas import MediaUploadRead
from app.media.service import resolve_media_path, save_upload
from app.user.deps import get_current_user
from app.user.models import User

media_router = APIRouter(prefix="/media", tags=["Медиа"])


@media_router.get("/{file_path:path}")
async def serve_media(file_path: str):
    return FileResponse(resolve_media_path(file_path))


@media_router.post(
    "/upload",
    response_model=StatusResponse[MediaUploadRead],
    status_code=status.HTTP_201_CREATED,
    summary="Загрузить файл",
    description=(
        "Загружает файл в медиахранилище и возвращает его путь "
        "(`/media/<имя_файла>`) для использования в других полях. "
        "Разрешённые расширения: jpg, jpeg, png, webp, avif, gif, svg. "
        "Максимальный размер — 10 МБ."
    ),
)
async def upload_media(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
):
    url = await save_upload(file)
    return StatusResponse(
        success=True,
        message="Файл загружен",
        data=MediaUploadRead(url=url),
    )


@media_router.delete(
    "/{file_path:path}",
    response_model=StatusResponse[None],
    summary="Удалить файл",
    description="Удаляет файл из медиахранилища.",
    responses={404: {"description": "Файл не найден"}},
)
async def delete_media(
    file_path: str,
    current_user: User = Depends(get_current_user),
):
    resolve_media_path(file_path).unlink()
    return StatusResponse(success=True, message="Файл удалён", data=None)
