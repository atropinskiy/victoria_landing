import uuid
from datetime import UTC, datetime, timedelta

from fastapi import Response
from jose import jwt
from passlib.context import CryptContext

from app.core.config import get_auth_data, settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ACCESS_TOKEN_COOKIE_NAME = "access_token"
REFRESH_TOKEN_COOKIE_NAME = "refresh_token"


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def decode_token(token: str) -> dict:
    auth = get_auth_data()
    return jwt.decode(token, auth["public_key"], algorithms=[auth["algorithm"]])


def create_access_token(data: dict) -> str:
    auth = get_auth_data()
    payload = data.copy()
    payload["jti"] = uuid.uuid4().hex
    payload["exp"] = datetime.now(UTC) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return jwt.encode(payload, auth["private_key"], algorithm=auth["algorithm"])


def create_refresh_token(username: str, role: str) -> tuple[str, str, datetime]:
    auth = get_auth_data()
    jti = uuid.uuid4().hex
    expires_at = datetime.now(UTC) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {"sub": username, "role": role, "jti": jti, "exp": expires_at}
    token = jwt.encode(payload, auth["private_key"], algorithm=auth["algorithm"])
    return token, jti, expires_at


def set_access_token_cookie(response: Response, access_token: str) -> None:
    response.set_cookie(
        ACCESS_TOKEN_COOKIE_NAME,
        access_token,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=True,
        samesite="lax",
        path="/",
    )


def set_refresh_cookie(response: Response, refresh_token: str) -> None:
    response.set_cookie(
        REFRESH_TOKEN_COOKIE_NAME,
        refresh_token,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        httponly=True,
        secure=True,
        samesite="lax",
        path="/",
    )


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(ACCESS_TOKEN_COOKIE_NAME, path="/")
    response.delete_cookie(REFRESH_TOKEN_COOKIE_NAME, path="/")
