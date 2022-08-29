from flask_restful import Resource, reqparse

from api.db import get_db
from api.service.search_service import get_article_by_title


class ArticleSearchByTitle(Resource):
    def get(self):
        db = get_db()
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('query', type=str, location='args', required=True)
        data = parser.parse_args()
        query = data['query']
        result = []
        try:
            result = get_article_by_title(db, query)
        except ValueError as e:
            return {"message": f"{e}"}, 404
        except Exception as e:
            return {"message": f"{e}"}, 400
        return {"message": result}, 200
