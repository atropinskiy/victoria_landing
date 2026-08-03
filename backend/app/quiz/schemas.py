from pydantic import BaseModel, Field


class Bilingual(BaseModel):
    ru: str
    en: str


class OptionCreate(BaseModel):
    text: Bilingual
    weight: int
    category: str = Field(..., min_length=1)


class QuestionCreate(BaseModel):
    text: Bilingual
    options: list[OptionCreate] = Field(default_factory=list)


class CategoryCreate(BaseModel):
    title: Bilingual
    questions: list[QuestionCreate] = Field(default_factory=list)


class TestCreate(BaseModel):
    title: Bilingual
    sections: list[CategoryCreate] = Field(default_factory=list)


# Публичный формат чтения — без weight, чтобы не показывать баллы до прохождения теста.


class OptionRead(BaseModel):
    id: int
    text: Bilingual
    category: str


class QuestionRead(BaseModel):
    id: int
    text: Bilingual
    options: list[OptionRead]


class SectionRead(BaseModel):
    id: int
    title: Bilingual
    questions: list[QuestionRead]


class TestRead(BaseModel):
    id: int
    title: Bilingual
    sections: list[SectionRead]


# Ответ на создание/обновление — с weight, чтобы автор теста мог проверить сохранённые баллы.


class OptionAdminRead(BaseModel):
    id: int
    text: Bilingual
    category: str
    weight: int


class QuestionAdminRead(BaseModel):
    id: int
    text: Bilingual
    options: list[OptionAdminRead]


class SectionAdminRead(BaseModel):
    id: int
    title: Bilingual
    questions: list[QuestionAdminRead]


class TestAdminRead(BaseModel):
    id: int
    title: Bilingual
    sections: list[SectionAdminRead]


class AnswerItem(BaseModel):
    question_id: int
    option_id: int


class TestSubmitRequest(BaseModel):
    answers: list[AnswerItem] = Field(default_factory=list)


class TestResultRead(BaseModel):
    scores: dict[str, int]
