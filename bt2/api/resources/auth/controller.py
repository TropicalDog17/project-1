import traceback

from flask_restful import Resource, reqparse

from api.common.util import check_if_user_exists
from api.db import get_db
from api.service.auth_service import create_user, login, get_user_info
from flask import g

class Register(Resource):
    def post(self):
        db = get_db()
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('email', type=str, help="Please enter email", location='json')
        parser.add_argument('password', type=str, help="Please enter password", location='json')
        data = parser.parse_args()
        user_existed = check_if_user_exists(db, data['email'])
        if user_existed:
            return {'message': 'Email address is already registered'}, 400
        try:
            result = create_user(db, data)
            return {'message': 'Successfully registered', "data": result, "auth_token": result["auth_token"]}, 200
            pass
        except Exception as e:
            return {"message": str(e)}, 400
class Login(Resource):
    def post(self):
        db = get_db()
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('email', type=str, help="Please enter email", location='json')
        parser.add_argument('password', type=str, help="Please enter password", location='json')
        data = parser.parse_args()
        try:
            auth_token = login(db, data)
            return {"message": "Login successfully", "auth_token": auth_token}, 200
            pass
        except Exception as e:
            return {"message": str(e)}, 400
class Status(Resource):
    def post(self):
        db = get_db()
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('Authorization', location='headers')
        data = parser.parse_args()
        try:
            user_info = get_user_info(db, data)
            return {"data": str(user_info)}
        except Exception as e:
            traceback.print_exc()
            return {'message': str(e)}, 401
