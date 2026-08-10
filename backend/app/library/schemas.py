from pydantic import BaseModel

from app.core.schemas import Bilingual


class LibraryOrderItem(BaseModel):
    id: int
    order: int


class LibraryRead(BaseModel):
    id: int
    order: int
    title: Bilingual
    description: Bilingual
    image: str | None
    document: str | None
