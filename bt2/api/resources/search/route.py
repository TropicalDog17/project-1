from api.resources.search.controller import ArticleSearchByTitle, ArticleSearchByContent
from api.resources.search import api

api.add_resource(ArticleSearchByTitle, "/title")
api.add_resource(ArticleSearchByContent, "/content")

