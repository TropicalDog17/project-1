from sqlalchemy.orm import Session

from db import models
import schemas
from schemas import UserInDB
from sqlalchemy.orm import Session


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)
def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()