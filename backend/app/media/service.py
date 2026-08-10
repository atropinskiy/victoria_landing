import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

MEDIA_DIR = Path("media").resolve()
MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10 МБ
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"}
DOCUMENT_EXTENSIONS = {".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"}


def resolve_media_path(file_path: str) -> Path:
    full_path = (MEDIA_DIR / file_path).resolve()
    if MEDIA_DIR not in full_path.parents or not full_path.is_file():
        raise HTTPException(status_code=404, detail="Файл не найден")
    return full_path


async def save_upload(file: UploadFile, allowed_extensions: set[str]) -> str:
    ext = Path(file.filename or "").suffix.lower()
    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Недопустимый тип файла. Разрешены: {', '.join(sorted(allowed_extensions))}",
        )

    contents = await file.read(MAX_UPLOAD_SIZE + 1)
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Файл больше {MAX_UPLOAD_SIZE // (1024 * 1024)} МБ",
        )

    filename = f"{uuid.uuid4().hex}{ext}"
    (MEDIA_DIR / filename).write_bytes(contents)
    return f"/media/{filename}"


def delete_upload(url: str) -> None:
    """Удаляет файл по URL вида /media/<имя>, отданному save_upload. Отсутствие файла — не ошибка"""
    filename = url.rsplit("/", 1)[-1]
    path = (MEDIA_DIR / filename).resolve()
    if MEDIA_DIR in path.parents and path.is_file():
        path.unlink()
