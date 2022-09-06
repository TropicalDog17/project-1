
import bcrypt
import traceback
from api.common.util import retrieve_sql_row_data, check_if_user_exists, get_hashed_password

from flask_jwt_extended import create_access_token, decode_token


def create_user(db, data):
    email = data['email']
    password = data['password']
    try:
        if not email or not password:
            raise ValueError

        row = db.execute("INSERT INTO user (email, password) VALUES (?, ?)", (email, bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt(8))))
        db.commit()
        auth_token = create_access_token(str(row.lastrowid))
        return {
            'auth_token': str(auth_token)
        }
    except ValueError as e:
        if not email:
            raise ValueError("Please provide email")
        if not password:
            raise ValueError("Please provide password")
    except Exception as e:
        traceback.print_exc()
        raise e


def login(db, data):
    email = data['email']
    password = data['password']
    try:
        if not email or not password:
            raise ValueError
        if not check_if_user_exists(db, email):
            raise ValueError("Email not exists")
        row = db.execute("SELECT * FROM user WHERE email=?", (email,)).fetchone()

        # Password here is already hashed by Bcrypt
        user_data = retrieve_sql_row_data(row, "id", "email", "password")

        hashed_password = user_data['password']
        if not bcrypt.checkpw(password.encode("utf-8"), hashed_password):
            raise ValueError("Incorrect password")
        auth_token = create_access_token(identity=user_data['id'])
        return auth_token
    except Exception as e:
        raise e


def get_user_info(db, data):
    auth_header = data['Authorization']
    if not auth_header:
        raise ValueError("Authorization header missing")
    auth_token = auth_header.split(" ")[1]
    print(auth_token)
    if not auth_token:
        raise ValueError("Authorization token missing")
    payload = decode_token(auth_token)
    user_id = payload.get('sub')
    if isinstance(payload, str):
        raise ValueError(payload)
    row = db.execute("SELECT * FROM user WHERE id=?", (user_id,)).fetchone()
    user_info = retrieve_sql_row_data(row, "id", "email", "password")
    return user_info
