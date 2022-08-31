import shortuuid
def test_register_valid(test_client):
    data = {"email": shortuuid.uuid()+ "td17@gmail.com", "password": shortuuid.uuid()}
    response = test_client.post("/api/auth/register/", json=data, headers={"Content-Type": "application/json", "Accept": "application/json"})

    assert response.status_code == 200
def test_register_duplicated(test_client):
    data = {"email": "td17@gmail.com", "password": shortuuid.uuid()}
    response = test_client.post("/api/auth/register/", json=data, headers={"Content-Type": "application/json", "Accept": "application/json"})

    assert response.status_code == 400