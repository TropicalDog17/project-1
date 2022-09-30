from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import schemas
import crud.search
from db import models
from dependencies import get_db

router = APIRouter()


@router.get("/search/title/", response_model=List[schemas.Article])
def search_articles_by_title(query: str, db: Session = Depends(get_db)):
    if not query:
        raise HTTPException(status_code=400, detail="Query must not be empty")
    articles = crud.search.search_articles_by_title(db=db, query=query)
    if not articles:
        raise HTTPException(status_code=404, detail="Article not found")
    return articles


@router.get("/search/content/", response_model=List[schemas.Article])
def search_articles_by_content(query: str, db: Session = Depends(get_db)):
    if not query:
        raise HTTPException(status_code=400, detail="Query must not be empty")
    articles = crud.search.search_articles_by_content(db=db, query=query)
    if not articles:
        raise HTTPException(status_code=404, detail="Article not found")
    return articles
