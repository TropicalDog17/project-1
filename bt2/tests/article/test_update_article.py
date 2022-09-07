import shortuuid

from api.common.util import get_auth_token_for_test


def test_update_exist_article(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    data = {
        "link": random_link, "title": random_title, "content": "fssdfsfsdfc"
    }
    auth_token = get_auth_token_for_test(test_client)
    response = test_client.put(f"api/articles/2", json=data,
                               headers={"Authorization": "Bearer " + auth_token, "Content-Type": "application/json",
                                        "Accept": "application/json"}, )
    assert response.status_code == 200


def test_update_non_exist_article(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    data = {
        "link": random_link, "title": random_title, "content": "fssdfsdfsdfc"
    }
    auth_token = get_auth_token_for_test(test_client)
    response = test_client.put(f"api/articles/10000000", json=data,
                               headers={"Authorization": "Bearer " + auth_token, "Content-Type": "application/json",
                                        "Accept": "application/json"}, )
    assert response.status_code == 404


def test_update_without_article_id(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    data = {
        "link": random_link, "title": random_title, "content": "fssdfssdfsdfc"
    }
    auth_token = get_auth_token_for_test(test_client)
    response = test_client.put(f"api/articles/", json=data,
                               headers={"Authorization": "Bearer " + auth_token, "Content-Type": "application/json",
                                        "Accept": "application/json"}, )
    assert response.status_code == 405
