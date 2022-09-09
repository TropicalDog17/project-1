from sqlalchemy.orm import Session

from db import models


def search_articles_by_title(db: Session, query: str):
    return db.query(models.Article).filter(models.Article.title.like('%' + query + '%')).all()


def search_articles_by_content(db: Session, query: str):
    return db.query(models.Article).filter(models.Article.content.like('%' + query + '%')).all()
