import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_db_url
from app.core.database import Base, get_db
from app.main import app

# ВАЖНО!!! Переключите базу на локальную в докер компоуз. Если тест прогонялся 1 раз, то во 2
# выйдет ошибка из за ограниения уникальности записей

@pytest.fixture
async def db_session():
    engine = create_async_engine(get_db_url(), echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    session_maker = sessionmaker(engine, class_=None, expire_on_commit=False)
    # AsyncSession нужен явно:
    from sqlalchemy.ext.asyncio import AsyncSession

    session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with session_maker() as session:
        yield session

    await engine.dispose()


@pytest.fixture
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


async def _auth_headers(client) -> dict:
    resp = await client.post(
        "/auth/register",
        json={"username": "tester", "email": "t@example.com", "password": "secret123"},
    )
    token = resp.json()["data"]["access_token"]
    return {"Authorization": f"Bearer {token}"}


async def test_create_service_requires_auth(client):
    resp = await client.post(
        "/services",
        json={
            "title": {"ru": "Услуга", "en": "Service"},
            "description": {"ru": "Описание", "en": "Description"},
            "stages": [],
        },
    )
    assert resp.status_code in (401, 403)  # HTTPBearer без токена -> 403


async def test_create_service_with_auth(client):
    headers = await _auth_headers(client)
    resp = await client.post(
        "/services",
        headers=headers,
        json={
            "title": {"ru": "Услуга", "en": "Service"},
            "description": {"ru": "Описание", "en": "Description"},
            "stages": [],
        },
    )
    assert resp.status_code == 201
    assert resp.json()["data"]["title"]["ru"] == "Услуга"
