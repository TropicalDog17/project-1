from api.common.util import get_hashed_password
from api.db import get_db


def test_hashed_password(test_client):
    db = get_db()
    hashed_password = get_hashed_password(db, "td17@gmail.com")

    assert hashed_password is not None

