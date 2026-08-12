from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from jose import JWTError, jwk
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_auth_data
from app.core.database import get_db
from app.core.schemas import StatusResponse
from app.core.security import (
    REFRESH_TOKEN_COOKIE_NAME,
    clear_auth_cookies,
    create_access_token,
    create_refresh_token,
    decode_token,
    set_access_token_cookie,
    set_refresh_cookie,
    verify_password,
)
from app.user import crud
from app.user.deps import get_current_user, get_token_payload
from app.user.models import User
from app.user.schemas import PublicKeyRead, UserCreate, UserLogin, UserRead

auth_router = APIRouter(prefix="/auth", tags=["Авторизация"])
user_router = APIRouter(prefix="/users", tags=["Пользователи"])


async def _issue_tokens(response: Response, db: AsyncSession, user: User) -> None:
    access_token = create_access_token({"sub": user.username, "role": user.role})
    refresh_token, jti, expires_at = create_refresh_token(user.username, user.role)
    await crud.store_refresh_token(db, jti, user.id, expires_at)
    set_access_token_cookie(response, access_token)
    set_refresh_cookie(response, refresh_token)


@auth_router.post(
    "/register",
    response_model=StatusResponse[UserRead],
    status_code=status.HTTP_201_CREATED,
    summary="Регистрация",
    description=(
        "Создаёт нового пользователя и сразу выставляет JWT access/refresh token в httpOnly cookie."
    ),
)
async def register(
    data: UserCreate, response: Response, db: AsyncSession = Depends(get_db)
):
    if data.email and await crud.get_by_email(db, data.email):
        raise HTTPException(
            status_code=400, detail="Пользователь с таким email уже существует"
        )
    if await crud.get_by_username(db, data.username):
        raise HTTPException(
            status_code=400, detail="Пользователь с таким username уже существует"
        )
    user = await crud.create(db, data)
    await _issue_tokens(response, db, user)
    return StatusResponse(
        success=True,
        message="Пользователь зарегистрирован",
        data=UserRead.model_validate(user),
    )


@auth_router.post(
    "/login",
    response_model=StatusResponse[UserRead],
    summary="Вход",
    description=(
        "Принимает email **или** username и пароль, выставляет JWT access/refresh token "
        "в httpOnly cookie (и роль пользователя в отдельную читаемую подписанную cookie)."
    ),
    responses={
        200: {
            "description": "Успешный вход",
            "content": {
                "application/json": {
                    "examples": {
                        "success": {
                            "summary": "Успешный вход",
                            "value": {
                                "success": True,
                                "message": "Вход выполнен успешно",
                                "data": {
                                    "id": 1,
                                    "email": "user@example.com",
                                    "username": "john_doe",
                                    "is_active": True,
                                    "role": "user",
                                },
                            },
                        }
                    }
                }
            },
        },
        401: {
            "description": "Неверный логин или пароль",
            "content": {
                "application/json": {
                    "examples": {
                        "error": {
                            "summary": "Неверные учётные данные",
                            "value": {
                                "success": False,
                                "message": "Неверный логин или пароль",
                                "data": None,
                            },
                        }
                    }
                }
            },
        },
    },
)
async def login(
    data: UserLogin, response: Response, db: AsyncSession = Depends(get_db)
):
    user = await crud.get_by_email_or_username(db, data.login)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный логин или пароль"
        )
    await _issue_tokens(response, db, user)
    return StatusResponse(
        success=True,
        message="Вход выполнен успешно",
        data=UserRead.model_validate(user),
    )


@auth_router.post(
    "/refresh",
    response_model=StatusResponse[UserRead],
    summary="Обновление токена",
    description=(
        "Читает refresh token из httpOnly cookie и выдаёт новую пару access/refresh "
        "(с ротацией — старый refresh token отзывается)."
    ),
    responses={401: {"description": "Refresh token отсутствует, истёк или отозван"}},
)
async def refresh(
    request: Request, response: Response, db: AsyncSession = Depends(get_db)
):
    exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Не удалось обновить токен"
    )
    token = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)
    if token is None:
        raise exc
    try:
        payload = decode_token(token)
    except JWTError:
        raise exc from None

    jti = payload.get("jti")
    username = payload.get("sub")
    if jti is None or username is None:
        raise exc

    record = await crud.get_refresh_token(db, jti)
    if record is None:
        raise exc
    if record.revoked_at is not None:
        # Токен уже был провёрнут ранее — это переиспользование, возможный признак
        # кражи refresh token. Гасим все активные сессии пользователя.
        await crud.revoke_all_refresh_tokens(db, record.user_id)
        raise exc
    if record.expires_at < datetime.now(UTC):
        raise exc

    user = await crud.get_by_username(db, username)
    if user is None:
        raise exc

    await crud.revoke_refresh_token(db, jti)
    await _issue_tokens(response, db, user)
    return StatusResponse(
        success=True, message="Токен обновлён", data=UserRead.model_validate(user)
    )


@auth_router.get(
    "/public-key",
    response_model=StatusResponse[PublicKeyRead],
    summary="Публичный ключ",
    description=(
        "Публичный ключ в формате JWK (ES256), которым подписаны JWT — можно "
        "проверить подпись на клиенте, не обращаясь к бэкенду за каждым запросом."
    ),
)
async def get_public_key():
    auth = get_auth_data()
    key = jwk.construct(auth["public_key"], auth["algorithm"])
    return StatusResponse(
        success=True,
        message="Публичный ключ получен",
        data=PublicKeyRead(**key.to_dict()),
    )


@user_router.get(
    "/me",
    response_model=StatusResponse[UserRead],
    summary="Текущий пользователь",
    description="Возвращает данные авторизованного пользователя по JWT токену.",
)
async def get_me(current_user: User = Depends(get_current_user)):
    return StatusResponse(
        success=True, message="Данные пользователя получены", data=current_user
    )


@user_router.post(
    "/logout",
    response_model=StatusResponse[UserRead],
    summary="Выход из профиля",
    description="Отзывает текущий access и refresh токен авторизованного пользователя",
)
async def logout(
    request: Request,
    response: Response,
    payload: dict = Depends(get_token_payload),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    expires_at = datetime.fromtimestamp(payload["exp"], tz=UTC)
    await crud.revoke_token(db, payload["jti"], expires_at)

    refresh_cookie = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)
    if refresh_cookie is not None:
        try:
            refresh_payload = decode_token(refresh_cookie)
        except JWTError:
            refresh_payload = None
        if refresh_payload is not None and refresh_payload.get("jti"):
            await crud.revoke_refresh_token(db, refresh_payload["jti"])

    clear_auth_cookies(response)
    return StatusResponse(
        success=True, message="Вы вышли из системы", data=current_user
    )
