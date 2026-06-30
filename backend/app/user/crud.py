from datetime import datetime
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import hash_password
from app.user.models import RevokedToken, User
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
