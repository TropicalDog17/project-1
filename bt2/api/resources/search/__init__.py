from flask import Blueprint
from flask_restful import Api

search_bp = Blueprint('search', __name__)
api = Api(search_bp, prefix="/search/article")

import api.resources.search.route