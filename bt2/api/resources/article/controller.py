from flask_restful import Api, Resource, reqparse
from api.db import get_db
from api.service.article_service import get_all_articles, get_articles_pagination, get_one_article, insert_one_article


class ArticleList(Resource):
    def get(self):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('page', type=int, help="Please enter page index", location='args')
        parser.add_argument('limit', type=int,
                            help="Please enter an integer indicates maximum number of article in a single page",
                            location='args')
        db = get_db()

        data = parser.parse_args()

        result = []
        try:
            if not data['page'] and not data['limit']:
                result = get_all_articles(db)
            elif data['page'] and data['limit']:
                result = get_articles_pagination(db, data)
        except Exception as e:
            return {"message": f'{e}'}, 400
        return {"data": result}


    def post(self):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('link', type=str, help="Please enter article link", location='args')
        parser.add_argument('title', type=str, help="Please enter article title", location='args')
        parser.add_argument('content', type=str, help="Please enter article content", location='args')
        db = get_db()
        data = parser.parse_args()

        db = get_db()
        try:
            result = insert_one_article(db, data)
            pass
        except Exception as e:
            print(e)
            return {"message": "Unexpected error"}
        return {"message": "Article added successfully", "data": result}


class ArticleOne(Resource):
    def get(self, article_id):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('id', type=int, help="Please enter article id", location='args')
        db = get_db()
        data = parser.parse_args()
        try:
            result = get_one_article(db, article_id)
        except TypeError as te:
            return {"message": f'{te}'}, 404
        except ValueError as ve:
            return {"message": f'{ve}'}, 404
        except Exception as e:
            return {"message": f'{e}'}, 400
        return {'data': result}


