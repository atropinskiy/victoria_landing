import uuid
from datetime import UTC, datetime, timedelta

from fastapi import Response
from jose import jwt
from passlib.context import CryptContext

from app.core.config import get_auth_data, settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ACCESS_TOKEN_COOKIE_NAME = "access_token"
USER_ROLE_COOKIE_NAME = "user_role"


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict) -> str:
    auth = get_auth_data()
    payload = data.copy()
    payload["jti"] = uuid.uuid4().hex
    payload["exp"] = datetime.now(UTC) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return jwt.encode(payload, auth["secret_key"], algorithm=auth["algorithm"])


def set_auth_cookies(response: Response, token: str, role: str) -> None:
    max_age = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    response.set_cookie(
        ACCESS_TOKEN_COOKIE_NAME,
        token,
        max_age=max_age,
        httponly=True,
        secure=True,
        samesite="lax",
        path="/",
    )
    response.set_cookie(
        USER_ROLE_COOKIE_NAME,
        role,
        max_age=max_age,
        httponly=False,
        secure=True,
        samesite="lax",
        path="/",
    )


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(ACCESS_TOKEN_COOKIE_NAME, path="/")
    response.delete_cookie(USER_ROLE_COOKIE_NAME, path="/")
