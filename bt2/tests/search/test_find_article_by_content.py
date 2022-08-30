import random
import string


def test_search_valid_query(test_client):
    response = test_client.get("/api/search/article/content", query_string="query=a")
    print(response.data)
    assert response.status_code == 200
    assert "data" in response.get_json()


def test_search_empty_query(test_client):
    response = test_client.get("/api/search/article/content", query_string="query=")
    assert response.status_code == 404


def test_search_long_query(test_client):
    chars = string.ascii_lowercase + string.digits
    long_query = ''.join(random.choice(chars) for _ in range(1000))
    response = test_client.get("/api/search/article/content", query_string=f"query={long_query}")
    assert response.status_code == 404
