from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Tests(Base):
    __tablename__ = "tests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title_ru: Mapped[str] = mapped_column(String, nullable=False)
    title_en: Mapped[str] = mapped_column(String, nullable=False)

    categories: Mapped[list["TestCategories"]] = relationship(
        back_populates="test",
        order_by="TestCategories.order",
        cascade="all, delete-orphan",
    )


class TestCategories(Base):
    __tablename__ = "test_categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    test_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("tests.id", ondelete="CASCADE"), nullable=False
    )
    order: Mapped[int] = mapped_column(Integer, index=False)
    title_ru: Mapped[str] = mapped_column(String, nullable=False)
    title_en: Mapped[str] = mapped_column(String, nullable=False)

    test: Mapped["Tests"] = relationship(back_populates="categories")
    questions: Mapped[list["TestQuestions"]] = relationship(
        back_populates="category",
        order_by="TestQuestions.order",
        cascade="all, delete-orphan",
    )


class TestQuestions(Base):
    __tablename__ = "test_questions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    category_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("test_categories.id", ondelete="CASCADE"), nullable=False
    )
    order: Mapped[int] = mapped_column(Integer, index=False)
    text_ru: Mapped[str] = mapped_column(String, nullable=False)
    text_en: Mapped[str] = mapped_column(String, nullable=False)

    category: Mapped["TestCategories"] = relationship(back_populates="questions")
    options: Mapped[list["TestOptions"]] = relationship(
        back_populates="question",
        order_by="TestOptions.order",
        cascade="all, delete-orphan",
    )


class TestOptions(Base):
    __tablename__ = "test_options"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    question_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("test_questions.id", ondelete="CASCADE"), nullable=False
    )
    order: Mapped[int] = mapped_column(Integer, index=False)
    text_ru: Mapped[str] = mapped_column(String, nullable=False)
    text_en: Mapped[str] = mapped_column(String, nullable=False)
    weight: Mapped[int] = mapped_column(Integer, nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False)

    question: Mapped["TestQuestions"] = relationship(back_populates="options")
