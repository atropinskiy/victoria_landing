from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Cases(Base):
    __tablename__ = "cases"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title_ru: Mapped[str | None] = mapped_column(
        String, unique=True, index=True, nullable=True
    )
    title_en: Mapped[str | None] = mapped_column(
        String, unique=True, index=True, nullable=True
    )
    ru_descr: Mapped[str | None] = mapped_column(String, index=False, nullable=True)
    en_descr: Mapped[str | None] = mapped_column(String, index=False, nullable=True)
    order: Mapped[int] = mapped_column(Integer, index=False)
    image: Mapped[str | None] = mapped_column(String, index=False, nullable=True)
