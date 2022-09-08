import os, sys

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
import schemas
import crud
from db import models
from dependencies import get_db

router = APIRouter()


@router.get("/articles/{article_id}", response_model=schemas.Article, tags=["user"])
def get_article(article_id: int, db: Session = Depends(get_db)):
    return crud.get_article(db, article_id=article_id)


@router.get("/articles/", response_model=List[schemas.Article], tags=["user"])
def get_all_articles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_articles(db, skip=skip, limit=limit)
    return items


@router.get("/articles/", response_model=List[schemas.Article], tags=["user"])
def search_articles_by_title(query: str, db: Session = Depends(get_db)):
    articles = crud.search_articles_by_title(db, title_query=query)
    return articles


@router.post("/articles/", response_model=schemas.Article, tags=["user"], status_code=201)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    return crud.create_article(db=db, article=article)


@router.put("/articles/{article_id}", response_model=schemas.Article, tags=["user"], responses={404: {"model": schemas.Message}})
def update_article(article_id: int, article: schemas.ArticleUpdate, db: Session = Depends(get_db)):
    article_db = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article_db:
        return JSONResponse(status_code=404, content={"message": "Item not found"})
    return crud.update_article(db=db, article=article, article_db=article_db)


@router.delete("/articles/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db), tags=["user"]):
    article_db = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article_db:
        raise HTTPException(status_code=404, detail="Article not found")
    return crud.delete_article(db=db, article_id=article_id)
