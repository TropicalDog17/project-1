def test_get_article(test_client):
    response = test_client.get("api/articles/")
    assert response.status_code == 200
    assert response.data is not None
