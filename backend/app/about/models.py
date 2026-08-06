from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class AboutContent(Base):
    __tablename__ = "about_content"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    promo_ru: Mapped[str] = mapped_column(Text, nullable=False)
    promo_en: Mapped[str] = mapped_column(Text, nullable=False)
    full_ru: Mapped[str] = mapped_column(Text, nullable=False)
    full_en: Mapped[str] = mapped_column(Text, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    __table_args__ = (CheckConstraint("id = 1", name="about_content_singleton"),)


class AboutRevision(Base):
    __tablename__ = "about_revisions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    promo_ru: Mapped[str] = mapped_column(Text, nullable=False)
    promo_en: Mapped[str] = mapped_column(Text, nullable=False)
    full_ru: Mapped[str] = mapped_column(Text, nullable=False)
    full_en: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
