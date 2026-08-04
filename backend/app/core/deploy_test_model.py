from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class DeployTest(Base):
    __tablename__ = "deploy_test"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    note: Mapped[str] = mapped_column(
        String, nullable=False, default="prod deploy test"
    )
