from flask import Blueprint
from flask_restful import Api
article_bp = Blueprint('article', __name__)
api = Api(article_bp)
import api.resources.article.route
