def test_insert_valid_data(test_client):
    response = test_client.post("/api/articles/",
                                query_string="link=example.com&title=Untitled&content='test sentence'")
    assert response.status_code == 200
    assert response.get_json()['data'] is not None
