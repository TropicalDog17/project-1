from flask import Blueprint
from flask_restful import Api

auth_bp = Blueprint('auth', __name__)
api = Api(auth_bp, prefix="/auth")

import api.resources.auth.route
