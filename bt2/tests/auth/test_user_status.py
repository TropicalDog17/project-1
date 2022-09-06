from api.common.util import get_auth_token_for_test


def test_user_status(test_client):
    auth_token = get_auth_token_for_test(test_client)
    response = test_client.post("/api/auth/status/", headers=dict(Authorization='Bearer '+auth_token))


    assert response.status_code == 200
    assert response.get_json()['data'] is not None
