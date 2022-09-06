import json
import traceback

import shortuuid

from api.common.util import get_auth_token_for_test


def test_insert_valid_data_and_authorized(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    info = {
        "link": random_link,
        "title": random_title,
        "content": "This is a test content"
    }
    response = test_client.post("/api/articles/", json=info,
                                headers={"Content-Type": "application/json",
                                         "Authorization": f"Bearer {get_auth_token_for_test(test_client)} "
                                    , "Accept": "application/json"}, )
    assert response.status_code == 201


def test_insert_no_auth_token(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    info = {
        "link": random_link,
        "title": random_title,
        "content": "This is a test content"
    }
    response = test_client.post("/api/articles/", json=info,
                                headers={"Content-Type": "application/json",
                                         "Authorization": f"Bearer a"
                                    , "Accept": "application/json"}, )
    assert response.status_code == 401


def test_insert_link_empty(test_client):
    random_title = shortuuid.uuid()
    info = {
        "link": "",
        "title": random_title,
        "content": "This is a test content"
    }
    response = test_client.post("/api/articles/", json=info,
                                headers={"Content-Type": "application/json", "Accept": "application/json"}, )
    assert response.status_code == 400
    assert response.get_json()["message"] == "Please provide link"


def test_insert_title_empty(test_client):
    random_link = shortuuid.uuid() + "example.com"
    info = {
        "link": random_link,
        "title": "",
        "content": "This is a test content"
    }
    response = test_client.post("/api/articles/", json=info,
                                headers={"Content-Type": "application/json", "Accept": "application/json"}, )
    assert response.status_code == 400
    assert response.get_json()["message"] == "Please provide title"


def test_insert_content_empty(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    info = {
        "link": random_link,
        "title": random_title,
        "content": ""
    }
    response = test_client.post("/api/articles/", json=info,
                                headers={"Content-Type": "application/json", "Accept": "application/json"}, )
    assert response.status_code == 400
    assert response.get_json()["message"] == "Please provide content"
