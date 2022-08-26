from api.resources.article.controller import ArticleList, ArticleOne
from api.resources.article import api

api.add_resource(ArticleList, "/articles/")
api.add_resource(ArticleOne, "/articles/<article_id>")
