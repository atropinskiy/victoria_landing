import os

from pydantic_settings import BaseSettings, SettingsConfigDict

_APP_ENV = os.environ.get("APP_ENV", "local")
_ENV_FILE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", f".env.{_APP_ENV}"
)


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    model_config = SettingsConfigDict(env_file=_ENV_FILE)


settings = Settings()


def get_db_url() -> str:
    return (
        f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}@"
        f"{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
    )


def get_auth_data() -> dict:
    return {"secret_key": settings.SECRET_KEY, "algorithm": settings.ALGORITHM}
