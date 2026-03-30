from pydantic import BaseModel, Field
from datetime import datetime

class PhotoResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    image_url: str
    uploaded_at: datetime
    user_id: int
    is_public: bool = True

    class Config:
        from_attributes = True


class PhotoUpdate(BaseModel):
    title: str = Field(..., min_length=3)
    description: str = Field(..., min_length=1)







# class PhotoResponse(BaseModel):
#     id: int
#     title: str
#     description: str 
#     image_url: str
#     uploaded_at: datetime
#     user_id: int

#     class Config:
#         from_attributes = True




# class PhotoUpdate(BaseModel):
#     title: str
#     description: str