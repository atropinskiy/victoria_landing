from datetime import UTC, datetime

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.user.models import RefreshToken, RevokedToken, User
from app.user.schemas import UserCreate


async def get_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_by_username(db: AsyncSession, username: str) -> User | None:
    result = await db.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()


async def get_by_email_or_username(db: AsyncSession, login: str) -> User | None:
    result = await db.execute(
        select(User).where(or_(User.email == login, User.username == login))
    )
    return result.scalar_one_or_none()


async def create(db: AsyncSession, data: UserCreate) -> User:
    user = User(
        email=data.email,
        username=data.username,
        hashed_password=hash_password(data.password),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def is_token_revoked(db: AsyncSession, jti: str) -> bool:
    result = await db.execute(select(RevokedToken).where(RevokedToken.jti == jti))
    return result.scalar_one_or_none() is not None


async def revoke_token(db: AsyncSession, jti: str, expires_at: datetime) -> None:
    db.add(RevokedToken(jti=jti, expires_at=expires_at))
    await db.commit()


async def store_refresh_token(
    db: AsyncSession, jti: str, user_id: int, expires_at: datetime
) -> None:
    db.add(RefreshToken(jti=jti, user_id=user_id, expires_at=expires_at))
    await db.commit()


async def get_refresh_token(db: AsyncSession, jti: str) -> RefreshToken | None:
    result = await db.execute(select(RefreshToken).where(RefreshToken.jti == jti))
    return result.scalar_one_or_none()


async def revoke_refresh_token(db: AsyncSession, jti: str) -> None:
    token = await get_refresh_token(db, jti)
    if token is not None and token.revoked_at is None:
        token.revoked_at = datetime.now(UTC)
        await db.commit()


async def revoke_all_refresh_tokens(db: AsyncSession, user_id: int) -> None:
    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.user_id == user_id, RefreshToken.revoked_at.is_(None)
        )
    )
    now = datetime.now(UTC)
    for token in result.scalars():
        token.revoked_at = now
    await db.commit()
