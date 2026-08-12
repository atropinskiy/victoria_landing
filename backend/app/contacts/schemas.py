from pydantic import BaseModel, EmailStr


class ContactsRead(BaseModel):
    email: str
    phone: str
    address: str
    hours: str
    map_url: str


class ContactsUpdate(BaseModel):
    email: EmailStr
    phone: str
    address: str
    hours: str
    map_url: str = ""
