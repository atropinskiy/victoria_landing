from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.database import Base, engine
from app.user.router import auth_router, user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="Victoria Landing",
    description=(
        "API для посадочной страницы **Victoria**.\n\n"
        "Поддерживает регистрацию, вход по email или username, "
        "и доступ к данным авторизованного пользователя."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(auth_router)
app.include_router(user_router)
