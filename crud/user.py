from fastapi import Depends
from sqlalchemy.orm import Session

from db import models
import schemas
from schemas import UserInDB
from sqlalchemy.orm import Session


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)
def get_user(username: str, db: Session):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(user: schemas.UserInDB, db: Session):
    db_user = models.User(**user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
