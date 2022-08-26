import random
import string
def test_search_valid_query(test_client):
    response = test_client.get("/api/search/article/title", query_string="query=ha")
    assert response.status_code == 200
    assert response.get_json()['data'] is not None


def test_search_empty_query(test_client):
    response = test_client.get("/api/search/article/title", query_string="query=")
    assert response.status_code == 404
def test_search_long_query(test_client):
    chars = string.ascii_lowercase + string.digits
    long_query = ''.join(random.choice(chars) for _ in range(1000))
    response = test_client.get("/api/search/article/title", query_string="query=")
    assert response.status_code == 404
