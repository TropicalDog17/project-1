def test_registered_user_login(test_client):
    data = {"email": "td17@gmail.com", "password": "123456"}
    response = test_client.post("/api/auth/login/", json=data,
                                headers={"Content-Type": "application/json", "Accept": "application/json"})

    assert response.status_code == 200
    assert response.get_json()['message'] == 'Login successfully'
    assert response.get_json()['auth_token'] is not None


def test_unregistered_user_login(test_client):
    data = {"email": "2313123@gmail.com", "password": "312jlks"}
    response = test_client.post("/api/auth/login/", json=data,
                                headers={"Content-Type": "application/json", "Accept": "application/json"})

    assert response.status_code == 400
    assert response.get_json()['message'] == "Email not exists"


def test_registered_user_login_wrong_password(test_client):
    def test_registered_user_login(test_client):
        data = {"email": "td17@gmail.com", "password": "1234567"}
        response = test_client.post("/api/auth/login/", json=data,
                                    headers={"Content-Type": "application/json", "Accept": "application/json"})

        assert response.status_code == 400
        assert response.get_json()['message'] == 'Incorrect password'
