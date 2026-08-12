from sqlalchemy import CheckConstraint, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class ContactsContent(Base):
    __tablename__ = "contacts_content"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(Text, nullable=False)
    hours: Mapped[str] = mapped_column(Text, nullable=False)
    map_url: Mapped[str] = mapped_column(String, nullable=False, server_default="")

    __table_args__ = (CheckConstraint("id = 1", name="contacts_content_singleton"),)
