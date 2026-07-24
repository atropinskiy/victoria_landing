import os
from pydantic_settings import BaseSettings, SettingsConfigDict

_APP_ENV = os.environ.get("APP_ENV", "local")
_ENV_FILE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", f".env.{_APP_ENV}"
)


class Settings(BaseSettings):
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "victoria"
    DB_USER: str = "victoria"
    DB_PASSWORD: str = "victoria"

    SECRET_KEY: str = "changeme"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    model_config = SettingsConfigDict(env_file=_ENV_FILE)


settings = Settings()


def get_db_url() -> str:
    return (
        f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}@"
        f"{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
    )


def get_auth_data() -> dict:
    return {"secret_key": settings.SECRET_KEY, "algorithm": settings.ALGORITHM}
