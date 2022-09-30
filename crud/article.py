from sqlalchemy.orm import Session

from db import models
import schemas


def get_article(db: Session, article_id: int):
    return db.query(models.Article).filter(models.Article.id == article_id).first()


def get_articles(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Article).order_by(models.Article.id.desc()).offset(skip).limit(limit).all()


def create_article(db: Session, article: schemas.ArticleCreate):
    db_article = models.Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article


def update_article(db: Session, article: schemas.ArticleUpdate, article_db: schemas.Article):
    article_data = article.dict(exclude_unset=True)
    for key, value in article_data.items():
        setattr(article_db, key, value)
    db.add(article_db)
    db.commit()
    db.refresh(article_db)
    return article_db


def delete_article(db: Session, article_id: int):
    db.query(models.Article).filter(models.Article.id == article_id).delete()
    db.commit()
    return {"message": "Delete successfully"}
if __name__ == "__main__":
    print(DB_PATH)