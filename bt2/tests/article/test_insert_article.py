import shortuuid
def test_insert_valid_data(test_client):
    random_link = shortuuid.uuid() + "example.com"
    random_title = shortuuid.uuid()
    response = test_client.post("/api/articles/",
                                query_string=f"link={random_link}&title={random_title}&content='test sentence'")
    assert response.status_code == 200
