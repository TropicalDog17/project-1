import shortuuid


def test_update_exist_article(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    data = {
        "link": random_link, "title":random_title, "content": "fssdfsfsdfc"
    }
    response = test_client.delete(f"api/articles/1")
    assert response.status_code == 200


def test_update_non_exist_article(test_client):
    response = test_client.delete(f"api/articles/1000000000")
    assert response.status_code == 404


def test_update_without_article_id(test_client):
    response = test_client.delete(f"api/articles/")
    assert response.status_code == 405