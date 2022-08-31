def test_user_status(test_client):
    response = test_client.post("/api/auth/status/", headers=dict(Authorization='Bearer '+ "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjE5Mzc2NTUsImlhdCI6MTY2MTkzNDA1NSwic3ViIjo0fQ.zssoyVqOF1qsA6IUtAk1P2e2J0Kt4yfRPm_eZs83tDc"))


    assert response.status_code == 200
    assert response.get_json()['data'] is not None
