def test_get_article_paging(test_client):
    response = test_client.get("/api/articles/", query_string="page=2&limit=3")
    assert response.status_code == 200
    # assert response.message == "OK"
    assert response.data is not None


def test_get_article_paging_invalid(test_client):
    response = test_client.get("/api/articles/", query_string="page=-1&limit=10")
    assert response.status_code == 400
    assert response.get_json()['message'] == "Value must be greater than 0"


def test_get_article_empty_query(test_client):
    response = test_client.get("/api/articles/", query_string="page=&limit=")
    assert response.status_code == 400


def test_get_article_very_big_parameter(test_client):
    response = test_client.get("/api/articles/", query_string="page=1000&limit=1000")
    assert response.status_code == 200
    assert bool(response.get_json()['data']) is False  # Check if data is empty
