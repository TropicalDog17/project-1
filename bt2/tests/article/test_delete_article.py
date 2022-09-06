import werkzeug

from api.common.util import get_auth_token_for_test
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
    auth_token = get_auth_token_for_test(test_client)
    response = test_client.delete(f"api/articles/{int(result)}",headers={"Authorization": "Bearer " +auth_token }, )
    assert response.status_code == 200


def test_delete_non_exist_article(test_client):
    auth_token = get_auth_token_for_test(test_client)
    response = test_client.delete(f"api/articles/1000000000", headers={"Authorization": "Bearer " + auth_token })
    assert response.status_code == 404


def test_delete_without_article_id(test_client):
    auth_token = get_auth_token_for_test(test_client)

    response = test_client.delete(f"api/articles/", headers={"Authorization": "Bearer " + auth_token })
    assert response.status_code == 405
