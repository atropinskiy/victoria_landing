import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from fastapi.responses import FileResponse

from app.core.schemas import StatusResponse
from app.media.schemas import MediaUploadRead
from app.user.deps import get_current_user
from app.user.models import User

MEDIA_DIR = Path("media").resolve()
MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10 МБ
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"}

media_router = APIRouter(prefix="/media", tags=["Медиа"])


def _resolve_media_path(file_path: str) -> Path:
    full_path = (MEDIA_DIR / file_path).resolve()
    if MEDIA_DIR not in full_path.parents or not full_path.is_file():
        raise HTTPException(status_code=404, detail="Файл не найден")
    return full_path


@media_router.get("/{file_path:path}")
async def serve_media(file_path: str):
    return FileResponse(_resolve_media_path(file_path))


@media_router.post(
    "/upload",
    response_model=StatusResponse[MediaUploadRead],
    status_code=status.HTTP_201_CREATED,
    summary="Загрузить файл",
    description=(
        "Загружает файл в медиахранилище и возвращает его путь "
        "(`/media/<имя_файла>`) для использования в других полях. "
        f"Разрешённые расширения: {', '.join(sorted(ALLOWED_EXTENSIONS))}. "
        f"Максимальный размер — {MAX_UPLOAD_SIZE // (1024 * 1024)} МБ."
    ),
)
async def upload_media(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Недопустимый тип файла. Разрешены: {', '.join(sorted(ALLOWED_EXTENSIONS))}",
        )

    contents = await file.read(MAX_UPLOAD_SIZE + 1)
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Файл больше {MAX_UPLOAD_SIZE // (1024 * 1024)} МБ",
        )

    filename = f"{uuid.uuid4().hex}{ext}"
    (MEDIA_DIR / filename).write_bytes(contents)

    return StatusResponse(
        success=True,
        message="Файл загружен",
        data=MediaUploadRead(url=f"/media/{filename}"),
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
    _resolve_media_path(file_path).unlink()
    return StatusResponse(success=True, message="Файл удалён", data=None)
