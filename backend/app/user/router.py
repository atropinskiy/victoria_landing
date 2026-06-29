from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import create_access_token, verify_password
from app.user import crud
from app.user.deps import get_current_user
from app.user.models import User
from app.user.schemas import TokenRead, UserCreate, UserLogin, UserRead

auth_router = APIRouter(prefix="/auth", tags=["Авторизация"])
user_router = APIRouter(prefix="/users", tags=["Пользователи"])


@auth_router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    summary="Регистрация",
    description="Создаёт нового пользователя. Username обязателен, email — нет.",
)
async def register(data: UserCreate, db: AsyncSession = Depends(get_db)):
    if data.email and await crud.get_by_email(db, data.email):
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
    if await crud.get_by_username(db, data.username):
        raise HTTPException(status_code=400, detail="Пользователь с таким username уже существует")
    return await crud.create(db, data)


@auth_router.post(
    "/login",
    response_model=TokenRead,
    summary="Вход",
    description="Принимает email **или** username и пароль, возвращает JWT access token.",
)
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    user = await crud.get_by_email_or_username(db, data.login)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный логин или пароль")
    token = create_access_token({"sub": user.username})
    return {"access_token": token}


@user_router.get(
    "/me",
    response_model=UserRead,
    summary="Текущий пользователь",
    description="Возвращает данные авторизованного пользователя по JWT токену.",
)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
