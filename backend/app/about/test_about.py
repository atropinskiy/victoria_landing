import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.about.models import AboutContent, AboutRevision
from app.core.config import get_db_url
from app.core.database import Base, get_db
from app.main import app


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
            # Синглтон-строка уже существует в реальной БД после миграции —
            # затираем её тестовыми значениями внутри транзакции, а не создаём заново.
            content = await session.get(AboutContent, 1)
            if content is None:
                content = AboutContent(id=1)
                session.add(content)
            content.promo_ru = "<p>Промо</p>"
            content.promo_en = "<p>Promo</p>"
            content.full_ru = "<p>Полный текст</p>"
            content.full_en = "<p>Full text</p>"
            await session.commit()
            # Обновляем объект синхронно здесь — иначе onupdate-колонка (updated_at)
            # останется expired, а её ленивая подгрузка вне greenlet-контекста упадёт.
            await session.refresh(content)
            yield session
        await trans.rollback()

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


async def test_get_about_returns_seeded_content(client):
    resp = await client.get("/about")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["promo"]["ru"] == "<p>Промо</p>"
    assert data["full"]["en"] == "<p>Full text</p>"


async def test_update_about_requires_auth(client):
    resp = await client.patch(
        "/about",
        json={
            "promo": {"ru": "<p>Новое промо</p>", "en": "<p>New promo</p>"},
            "full": {"ru": "<p>Новый текст</p>", "en": "<p>New text</p>"},
        },
    )
    assert resp.status_code in (401, 403)


async def test_update_about_saves_and_creates_revision(client, db_session):
    headers = await _auth_headers(client)
    resp = await client.patch(
        "/about",
        headers=headers,
        json={
            "promo": {"ru": "<p>Новое промо</p>", "en": "<p>New promo</p>"},
            "full": {"ru": "<p>Новый текст</p>", "en": "<p>New text</p>"},
        },
    )
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["promo"]["ru"] == "<p>Новое промо</p>"

    revisions = (await db_session.execute(select(AboutRevision))).scalars().all()
    assert len(revisions) == 1
    assert revisions[0].promo_ru == "<p>Промо</p>"  # старая версия сохранена

    current = await db_session.get(AboutContent, 1)
    assert current.full_en == "<p>New text</p>"


async def test_update_about_strips_disallowed_tags(client):
    headers = await _auth_headers(client)
    resp = await client.patch(
        "/about",
        headers=headers,
        json={
            "promo": {
                "ru": "<p>Текст <script>alert(1)</script>жирным</p>",
                "en": "<p onclick='x()'>Text</p>",
            },
            "full": {"ru": "<p>Полный</p>", "en": "<p>Full</p>"},
        },
    )
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "<script>" not in data["promo"]["ru"]
    assert "onclick" not in data["promo"]["en"]
    assert "жирным" in data["promo"]["ru"]
