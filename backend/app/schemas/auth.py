from pydantic import BaseModel
from typing import Optional

class UserAuth(BaseModel):
    id: int
    name: str
    username: str
    email: str
    role: str

class Token(BaseModel):
    access_token: str
    user: UserAuth

class TokenData(BaseModel):
    username: Optional[str] = None

class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    role: str
