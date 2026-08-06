from pydantic import BaseModel, Field

from app.core.schemas import Bilingual

__all__ = ["Bilingual"]


# Категории пока отключены — см. app/services/models.py.
#
# class CategoryCreate(BaseModel):
#     title: Bilingual
#
#
# class CategoryRead(BaseModel):
#     id: int
#     title: Bilingual


class StageCreate(BaseModel):
    title: Bilingual
    items: list[Bilingual] = Field(default_factory=list)


class StageRead(BaseModel):
    title: Bilingual
    items: list[Bilingual]


class ServiceCreate(BaseModel):
    title: Bilingual
    description: Bilingual
    stages: list[StageCreate] = Field(default_factory=list)


class ServiceOrderItem(BaseModel):
    id: int
    order: int


class ServiceRead(BaseModel):
    id: int
    order: int
    title: Bilingual
    description: Bilingual
    stages: list[StageRead]


# class CategoryServices(BaseModel):
#     category_id: int
#     category_name: Bilingual
#     services: list[ServiceRead]
