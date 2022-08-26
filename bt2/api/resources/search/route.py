from api.resources.search.controller import ArticleSearchByTitle
from api.resources.search import api

api.add_resource(ArticleSearchByTitle, "/title")

