from datetime import datetime

from pydantic import BaseModel, field_validator

from app.about.sanitize import sanitize_html
from app.core.schemas import Bilingual


class AboutRead(BaseModel):
    promo: Bilingual
    full: Bilingual
    updated_at: datetime


class AboutUpdate(BaseModel):
    promo: Bilingual
    full: Bilingual

    @field_validator("*")
    @classmethod
    def sanitize(cls, value: Bilingual) -> Bilingual:
        return Bilingual(ru=sanitize_html(value.ru), en=sanitize_html(value.en))
