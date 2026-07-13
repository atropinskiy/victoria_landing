from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    email: EmailStr | None = Field(None, examples=["user@example.com"])
    username: str = Field(..., min_length=3, max_length=50, examples=["john_doe"])
    password: str = Field(..., min_length=8, examples=["strongpassword123"])


class UserLogin(BaseModel):
    login: str = Field(..., examples=["john_doe"], description="Email или username")
    password: str = Field(..., examples=["strongpassword123"])


class UserRead(BaseModel):
    id: int
    email: str | None
    username: str
    is_active: bool
    role: str

    model_config = {"from_attributes": True}


class TokenRead(BaseModel):
    access_token: str
    token_type: str = "bearer"
