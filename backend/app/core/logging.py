import json
import logging
from contextlib import suppress
from datetime import UTC, datetime

from fastapi import Request, Response
from jose import JWTError

from app.core.security import ACCESS_TOKEN_COOKIE_NAME, decode_token

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# Глушим сторонние логгеры — оставляем только наш victoria
for _noisy in ("uvicorn.access", "sqlalchemy.engine", "sqlalchemy"):
    logging.getLogger(_noisy).setLevel(logging.WARNING)

logger = logging.getLogger("victoria")


def _username_from_request(request: Request) -> str:
    token = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)
    if token is None:
        return "anonymous"
    try:
        payload = decode_token(token)
        return payload.get("sub", "anonymous")
    except JWTError:
        return "anonymous"


async def log_middleware(request: Request, call_next) -> Response:
    path = request.url.path.removeprefix(request.scope.get("root_path", ""))
    if path.startswith(("/server", "/media")):
        return await call_next(request)

    start = datetime.now(UTC)
    response = await call_next(request)

    # Буферизуем тело ответа чтобы вытащить message
    chunks = []
    async for chunk in response.body_iterator:
        chunks.append(chunk)
    body = b"".join(chunks)

    message = ""
    with suppress(json.JSONDecodeError, AttributeError):
        message = json.loads(body).get("message", "")

    elapsed = (datetime.now(UTC) - start).total_seconds() * 1000
    username = _username_from_request(request)

    logger.info(
        "%-20s | %s %-25s | %d | %s | %.0fms",
        username,
        request.method,
        request.url.path,
        response.status_code,
        message or "-",
        elapsed,
    )

    # Пересоздаём ответ (content-length пересчитается автоматически по новому телу).
    # dict(response.headers) тут не годится — он схлопывает повторяющиеся заголовки
    # (например несколько Set-Cookie для access_token + user_role) в один.
    # response.media_type тоже не годится — у обёртки из call_next он пустой,
    # реальный Content-Type сидит только в сырых headers, поэтому копируем их как есть.
    new_response = Response(content=body, status_code=response.status_code)
    new_response.raw_headers += [
        (key, value) for key, value in response.headers.raw if key != b"content-length"
    ]
    return new_response
