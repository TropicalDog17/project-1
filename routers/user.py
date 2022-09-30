import traceback
from datetime import timedelta

from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette.responses import Response

from crud.user import get_user, create_user
from dependencies import create_access_token, authenticate_user, get_db, get_current_user, get_password_hash
from schemas import User, Token, RegisterData

SECRET_KEY = "e4a9052da31849059595c915bb4aaebd6250e541370fe52bf0d86bf6fef89bbd"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()


@router.post("/users/")
async def register( response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    if get_user(form_data.username, db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already existed",
        )
    try:
        hashed_password = get_password_hash(form_data.password)
        user = {"username": form_data.username, "hashed_password": hashed_password}
        response = create_user(user, db)
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": response.username}, expires_delta=access_token_expires)
        return {"message": "User created successfully",
                "data": {"email": response.username, "hashed_password": response.hashed_password,
                         "access_token": access_token}}
    except Exception as e:
        traceback.print_exc()
        response.status_code = 400
        return {"message": "Unexpected error", "details": f'{e}'}


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
