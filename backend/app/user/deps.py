from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_auth_data
from app.core.database import get_db
from app.user import crud
from app.user.models import User

bearer_scheme = HTTPBearer()


async def get_token_payload(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> dict:
    exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учётные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        auth = get_auth_data()
        payload = jwt.decode(
            credentials.credentials, auth["secret_key"], algorithms=[auth["algorithm"]]
        )
    except JWTError:
        raise exc

    jti = payload.get("jti")
    if jti is None:
        raise exc
    if await crud.is_token_revoked(db, jti):
        raise exc
    return payload


async def get_current_user(
    payload: dict = Depends(get_token_payload),
    db: AsyncSession = Depends(get_db),
) -> User:
    exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учётные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    username: str | None = payload.get("sub")
    if username is None:
        raise exc

    user = await crud.get_by_username(db, username)
    if user is None:
        raise exc
    return user
