from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .db import Base


class Article(Base):
    __tablename__ = "article"
    id = Column(Integer, primary_key=True, index=True)
    link = Column(String, unique=True, index=True)
    title = Column(String)
    content = Column(String)

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    hashed_password = Column(String)
