from pydantic import BaseModel, EmailStr

from app.core.schemas import Bilingual


class ContactsRead(BaseModel):
    email: str
    phone: str
    address: Bilingual
    hours: Bilingual
    map_url: str


class ContactsUpdate(BaseModel):
    email: EmailStr
    phone: str
    address: Bilingual
    hours: Bilingual
    map_url: str = ""
