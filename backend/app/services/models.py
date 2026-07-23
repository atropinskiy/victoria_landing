from datetime import datetime
from sqlalchemy import Boolean, DateTime, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Categories(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    ru_descr: Mapped[str | None] = mapped_column(
        String, unique=True, index=False, nullable=True
    )
    en_descr: Mapped[str | None] = mapped_column(
        String, unique=True, index=False, nullable=True
    )
    services: Mapped[list["Services"]] = relationship(back_populates="category")


class Services(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    category_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False
    )
    title_ru: Mapped[str | None] = mapped_column(
        String, unique=True, index=True, nullable=True
    )
    title_en: Mapped[str | None] = mapped_column(
        String, unique=True, index=True, nullable=True
    )
    appr_title_ru: Mapped[str] = mapped_column(String, nullable=False)
    appr_title_en: Mapped[str] = mapped_column(String, nullable=False)
    ru_descr: Mapped[str | None] = mapped_column(
        String, unique=True, index=False, nullable=True
    )
    en_descr: Mapped[str | None] = mapped_column(
        String, unique=True, index=False, nullable=True
    )
    order: Mapped[int] = mapped_column(Integer, index=False)

    category: Mapped["Categories"] = relationship(back_populates="services")
    stages: Mapped[list["Stages"]] = relationship(
        back_populates="service",
        order_by="Stages.order",
        cascade="all, delete-orphan",
    )


class Stages(Base):
    __tablename__ = "stages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    service_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("services.id", ondelete="CASCADE"), nullable=False
    )
    order: Mapped[int] = mapped_column(Integer, index=False)
    title_ru: Mapped[str] = mapped_column(String, nullable=False)
    title_en: Mapped[str] = mapped_column(String, nullable=False)
    items: Mapped[list[dict]] = mapped_column(JSONB, nullable=False, default=list)

    service: Mapped["Services"] = relationship(back_populates="stages")
