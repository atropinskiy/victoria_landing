from pydantic import BaseModel

from app.core.schemas import Bilingual


class CaseOrderItem(BaseModel):
    id: int
    order: int


class CaseRead(BaseModel):
    id: int
    order: int
    title: Bilingual
    description: Bilingual
    image: str | None
