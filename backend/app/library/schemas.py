from pydantic import BaseModel

from app.core.schemas import Bilingual, BilingualOptional


class LibraryOrderItem(BaseModel):
    id: int
    order: int


class LibraryRead(BaseModel):
    id: int
    order: int
    title: Bilingual
    description: BilingualOptional
    image: str | None
    document: str | None
