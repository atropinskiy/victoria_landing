from typing import Generic, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class StatusResponse(BaseModel, Generic[T]):
    success: bool
    message: str = ""
    data: T | None = None


class BulkStatusResponse(BaseModel):
    success: bool
    message: str = ""
    count: int
