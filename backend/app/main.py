from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from app.core.logging import log_middleware, logger
from app.services.router import categories_router, services_router
from app.user.router import auth_router, user_router

app = FastAPI(
    title="Victoria Landing",
    description=(
        "API для посадочной страницы **Victoria**.\n\n"
        "Поддерживает регистрацию, вход по email или username, "
        "и доступ к данным авторизованного пользователя."
    ),
    version="1.0.0",
)

app.middleware("http")(log_middleware)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(categories_router)
app.include_router(services_router)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail, "data": None},
        headers=exc.headers,
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Необработанная ошибка при %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": f"Внутренняя ошибка сервера: {exc}", "data": None},
    )
