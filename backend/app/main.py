from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
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

app.include_router(auth_router)
app.include_router(user_router)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail, "data": None},
        headers=exc.headers,
    )
