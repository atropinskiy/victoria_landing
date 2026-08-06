from pydantic import BaseModel


class MediaUploadRead(BaseModel):
    url: str
