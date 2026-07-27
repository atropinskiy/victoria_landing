from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.schemas import StatusResponse
from app.core.security import create_access_token, verify_password
from app.user import crud
from app.user.deps import get_current_user, get_token_payload
from app.user.models import User
from app.user.schemas import TokenRead, UserCreate, UserLogin, UserRead, UserWithToken

auth_router = APIRouter(prefix="/auth", tags=["Авторизация"])
user_router = APIRouter(prefix="/users", tags=["Пользователи"])


@auth_router.post(
    "/register",
    response_model=StatusResponse[UserWithToken],
    status_code=status.HTTP_201_CREATED,
    summary="Регистрация",
    description="Создаёт нового пользователя и сразу возвращает JWT access token.",
)
async def register(data: UserCreate, db: AsyncSession = Depends(get_db)):
    if data.email and await crud.get_by_email(db, data.email):
        raise HTTPException(
            status_code=400, detail="Пользователь с таким email уже существует"
        )
    if await crud.get_by_username(db, data.username):
        raise HTTPException(
            status_code=400, detail="Пользователь с таким username уже существует"
        )
    user = await crud.create(db, data)
    token = create_access_token({"sub": user.username, "role": user.role})
    return StatusResponse(
        success=True,
        message="Пользователь зарегистрирован",
        data=UserWithToken(
            id=user.id,
            email=user.email,
            username=user.username,
            is_active=user.is_active,
            role=user.role,
            access_token=token,
        ),
    )


@auth_router.post(
    "/login",
    response_model=StatusResponse[TokenRead],
    summary="Вход",
    description="Принимает email **или** username и пароль, возвращает JWT access token.",
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
                                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                    "token_type": "bearer",
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
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    user = await crud.get_by_email_or_username(db, data.login)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный логин или пароль"
        )
    token = create_access_token({"sub": user.username, "role": user.role})
    return StatusResponse(
        success=True,
        message="Вход выполнен успешно",
        data=TokenRead(access_token=token),
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
    description="Отзывает текущий JWT токен авторизованного пользователя",
)
async def logout(
    payload: dict = Depends(get_token_payload),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    expires_at = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)
    await crud.revoke_token(db, payload["jti"], expires_at)
    return StatusResponse(
        success=True, message="Вы вышли из системы", data=current_user
    )
