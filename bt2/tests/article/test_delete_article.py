import werkzeug

from api.db import get_db
from api.service.article_service import insert_one_article
import shortuuid
from flask import jsonify


def test_delete_exist_article(test_client):
    db = get_db()
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    data = {
        "link": random_link, "title": random_title, "content": "fssdfsfsdfc"
    }
    result = jsonify(insert_one_article(db, data)).get_json()["id"]
    print(result)
    response = test_client.delete(f"api/articles/{int(result)}")
    assert response.status_code == 200


def test_delete_non_exist_article(test_client):
    response = test_client.delete(f"api/articles/1000000000")
    assert response.status_code == 404


def test_delete_without_article_id(test_client):
    response = test_client.delete(f"api/articles/")
    assert response.status_code == 405
