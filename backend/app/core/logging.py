import json
import logging
from datetime import datetime, timezone

from fastapi import Request, Response
from jose import JWTError, jwt

from app.core.config import get_auth_data

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("victoria")


def _username_from_request(request: Request) -> str:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return "anonymous"
    try:
        data = get_auth_data()
        payload = jwt.decode(auth[7:], data["secret_key"], algorithms=[data["algorithm"]])
        return payload.get("sub", "anonymous")
    except JWTError:
        return "anonymous"


async def log_middleware(request: Request, call_next) -> Response:
    # WebSocket и страница терминала — не JSON, пропускаем
    if request.url.path.startswith("/server"):
        return await call_next(request)

    start = datetime.now(timezone.utc)
    response = await call_next(request)

    # Буферизуем тело ответа чтобы вытащить message
    chunks = []
    async for chunk in response.body_iterator:
        chunks.append(chunk)
    body = b"".join(chunks)

    message = ""
    try:
        message = json.loads(body).get("message", "")
    except (json.JSONDecodeError, AttributeError):
        pass

    elapsed = (datetime.now(timezone.utc) - start).total_seconds() * 1000
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

    # Пересоздаём ответ (content-length пересчитается автоматически)
    headers = dict(response.headers)
    headers.pop("content-length", None)
    return Response(
        content=body,
        status_code=response.status_code,
        headers=headers,
        media_type=response.media_type,
    )
