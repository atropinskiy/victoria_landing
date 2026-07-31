from pydantic import BaseModel, Field


class OptionCreate(BaseModel):
    text: str
    weight: int
    category: str


class QuestionCreate(BaseModel):
    text: str
    options: list[OptionCreate] = Field(default_factory=list)


class CategoryCreate(BaseModel):
    title: str
    questions: list[QuestionCreate] = Field(default_factory=list)


class TestCreate(BaseModel):
    title: str
    sections: list[CategoryCreate] = Field(default_factory=list)


# Публичный формат чтения — без weight, чтобы не показывать баллы до прохождения теста.


class OptionRead(BaseModel):
    id: str
    text: str
    category: str


class QuestionRead(BaseModel):
    id: str
    text: str
    options: list[OptionRead]


class SectionRead(BaseModel):
    id: str
    title: str
    questions: list[QuestionRead]


class TestRead(BaseModel):
    id: str
    title: str
    sections: list[SectionRead]


# Ответ на создание/обновление — с weight, чтобы автор теста мог проверить сохранённые баллы.


class OptionAdminRead(BaseModel):
    id: str
    text: str
    category: str
    weight: int


class QuestionAdminRead(BaseModel):
    id: str
    text: str
    options: list[OptionAdminRead]


class SectionAdminRead(BaseModel):
    id: str
    title: str
    questions: list[QuestionAdminRead]


class TestAdminRead(BaseModel):
    id: str
    title: str
    sections: list[SectionAdminRead]


class AnswerItem(BaseModel):
    question_id: str
    option_id: str


class TestSubmitRequest(BaseModel):
    answers: list[AnswerItem] = Field(default_factory=list)


class TestResultRead(BaseModel):
    scores: dict[str, int]
