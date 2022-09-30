from typing import List, Union

from pydantic import BaseModel


class ArticleBase(BaseModel):
    link: str
    title: str
    content: Union[str, None] = None


class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(BaseModel):
    link:  Union[str, None] = None
    title:  Union[str, None] = None
    content: Union[str, None] = None


    class Config:
        orm_mode = True
    pass
class Article(ArticleBase):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Message(BaseModel):
    message: str


class User(BaseModel):
    username: str
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None

class UserInDB(User):
    hashed_password: str



class RegisterData(BaseModel):
    email: str
