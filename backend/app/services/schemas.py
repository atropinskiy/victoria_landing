from pydantic import BaseModel, Field


class Bilingual(BaseModel):
    ru: str
    en: str


class CategoryCreate(BaseModel):
    title: Bilingual


class CategoryRead(BaseModel):
    id: int
    title: Bilingual


class StageCreate(BaseModel):
    title: Bilingual
    items: list[Bilingual] = Field(default_factory=list)


class StageRead(BaseModel):
    title: Bilingual
    items: list[Bilingual]


class Approach(BaseModel):
    title: Bilingual
    text: Bilingual


class ServiceCreate(BaseModel):
    category_id: int
    order: int
    title: Bilingual
    approach: Approach
    stages: list[StageCreate] = Field(default_factory=list)


class ServiceRead(BaseModel):
    id: int
    order: int
    title: Bilingual
    approach: Approach
    stages: list[StageRead]


class CategoryServices(BaseModel):
    category_id: int
    category_name: Bilingual
    services: list[ServiceRead]
