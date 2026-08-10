import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import get_db_url
from app.core.database import Base, get_db
from app.main import app
from app.user.models import User


@pytest.fixture
async def db_session():
    engine = create_async_engine(get_db_url(), echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with engine.connect() as conn:
        trans = await conn.begin()
        # commit() внутри ручек фиксирует только SAVEPOINT на этом соединении —
        # реальный commit в контейнерную БД не проходит, откатываем всё разом ниже.
        session_maker = async_sessionmaker(
            bind=conn, expire_on_commit=False, join_transaction_mode="create_savepoint"
        )
        async with session_maker() as session:
            yield session
        await trans.rollback()

    await engine.dispose()


@pytest.fixture
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="https://test") as ac:
        yield ac
    app.dependency_overrides.clear()


async def _register(client, username="tester", email="t@example.com") -> dict:
    resp = await client.post(
        "/auth/register",
        json={"username": username, "email": email, "password": "secret123"},
    )
    return resp.json()["data"]


async def _register_admin(
    client, db_session, username="admin_tester", email="admin@example.com"
) -> dict:
    data = await _register(client, username, email)
    user = await db_session.get(User, data["id"])
    user.role = "admin"
    await db_session.commit()
    return data


async def test_create_service_requires_auth(client):
    resp = await client.post(
        "/services",
        json={
            "title": {"ru": "Услуга", "en": "Service"},
            "description": {"ru": "Описание", "en": "Description"},
            "stages": [],
        },
    )
    assert resp.status_code == 401


async def test_create_service_requires_admin(client):
    await _register(client)
    resp = await client.post(
        "/services",
        json={
            "title": {"ru": "Услуга", "en": "Service"},
            "description": {"ru": "Описание", "en": "Description"},
            "stages": [],
        },
    )
    assert resp.status_code == 403


async def test_create_service_with_auth(client, db_session):
    await _register_admin(client, db_session)
    resp = await client.post(
        "/services",
        json={
            "title": {"ru": "Услуга", "en": "Service"},
            "description": {"ru": "Описание", "en": "Description"},
            "stages": [],
        },
    )
    assert resp.status_code == 201
    assert resp.json()["data"]["title"]["ru"] == "Услуга"
