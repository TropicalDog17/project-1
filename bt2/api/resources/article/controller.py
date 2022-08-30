import traceback

from flask_restful import Resource, reqparse, output_json
from api.db import get_db
from api.service.article_service import get_all_articles, get_articles_pagination, get_one_article, insert_one_article, \
    delete_one_article, update_one_article
from flask import jsonify


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
        parser.add_argument('link', type=str, help="Please enter article link", location='json')
        parser.add_argument('title', type=str, help="Please enter article title", location='json')
        parser.add_argument('content', type=str, help="Please enter article content", location='json')
        db = get_db()
        data = parser.parse_args()
        try:
            result = insert_one_article(db, data)
            pass
        except Exception as e:
            return {"message": str(e)}, 400
        return {"message": "Article added successfully", "data": result}, 201


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

    def delete(self, article_id):
        db = get_db()
        try:
            result = delete_one_article(db, article_id)
        except ValueError as ve:
            return {"message": str(ve)}, 404
        except Exception as e:
            print(traceback.print_exc())
            return {"message": str(e)}, 400
        return {"data": result}, 200

    def put(self, article_id):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('link', type=str, help="Please enter link", location='json')
        parser.add_argument('title', type=str, help="Please enter title", location='json')
        parser.add_argument('content', type=str, help="Please enter content", location='json')
        db = get_db()
        data = parser.parse_args()
        try:
            result = update_one_article(db, article_id, data)
        except ValueError as ve:
            return {"message": str(ve)}, 404
        except Exception as e:
            print(traceback.print_exc())
            return {"message": str(e)}, 400
        return {"message":"Update successfully", "data": result}, 200
