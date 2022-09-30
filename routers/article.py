import os, sys

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
import schemas
import crud.article, crud.search
from db import models
from dependencies import get_db

from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()


@router.get("/articles/{article_id}", response_model=schemas.Article, tags=["article"])
def get_article(article_id: int, db: Session = Depends(get_db)):
    return crud.article.get_article(db, article_id=article_id)


@router.get("/articles/", response_model=List[schemas.Article], tags=["article"])
def get_all_articles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.article.get_articles(db, skip=skip, limit=limit)
    return items


@router.post("/articles/", response_model=schemas.Article, tags=["article"], status_code=201)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    return crud.article.create_article(db=db, article=article)


@router.put("/articles/{article_id}", response_model=schemas.Article, tags=["article"],
            responses={404: {"model": schemas.Message}})
def update_article(article_id: int, article: schemas.ArticleUpdate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    article_db = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article_db:
        return JSONResponse(status_code=404, content={"message": "Item not found"})
    return crud.article.update_article(db=db, article=article, article_db=article_db)


@router.delete("/articles/{article_id}", tags=["article"])
def delete_article(article_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    article_db = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article_db:
        raise HTTPException(status_code=404, detail="Article not found")
    return crud.article.delete_article(db=db, article_id=article_id)
