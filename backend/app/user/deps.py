from fastapi import Depends, HTTPException, Request, status
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import ACCESS_TOKEN_COOKIE_NAME, decode_token
from app.user import crud
from app.user.models import User


async def get_token_payload(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> dict:
    exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учётные данные",
    )
    token = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)
    if token is None:
        raise exc
    try:
        payload = decode_token(token)
    except JWTError:
        raise exc from None

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
    )
    username: str | None = payload.get("sub")
    if username is None:
        raise exc

    user = await crud.get_by_username(db, username)
    if user is None:
        raise exc
    return user


async def get_current_admin_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Требуются права администратора",
        )
    return current_user


async def get_current_user_optional(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> User | None:
    token = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)
    if token is None:
        return None
    try:
        payload = await get_token_payload(request, db)
    except HTTPException:
        return None

    username: str | None = payload.get("sub")
    if username is None:
        return None
    return await crud.get_by_username(db, username)
