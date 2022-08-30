from flask_restful import Resource, reqparse

from api.db import get_db
from api.service.search_service import get_article_by_query


class ArticleSearchByTitle(Resource):
    def get(self):
        db = get_db()
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('query', type=str, location='args', required=True)
        data = parser.parse_args()
        query = data['query']
        result = []
        try:
            result = get_article_by_query(db, "title", query)
        except ValueError as e:
            return {"message": f"{e}"}, 404
        except Exception as e:
            print(e)
            return {"message": f"{e}"}, 400
        return {"message": "OK", "data": result}, 200
class ArticleSearchByContent(Resource):
    def get(self):
        db = get_db()
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('query', type=str, location='args', required=True)
        data = parser.parse_args()
        query = data['query']
        result = []
        try:
            result = get_article_by_query(db, "content", query)
        except ValueError as e:
            return {"message": f"{e}"}, 404
        except Exception as e:
            print(e)
            return {"message": f"{e}"}, 400
        return {"message": "OK", "data": result}, 200