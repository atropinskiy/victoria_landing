from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
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


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail, "data": None},
        headers=exc.headers,
    )
