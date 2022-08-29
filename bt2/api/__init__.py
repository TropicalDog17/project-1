import os

from flask import Flask


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'dbapi.sqlite'),
    )
    print(app.instance_path)
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    from . import db
    db.init_app(app)

    from api.resources import article, search
    app.register_blueprint(article.article_bp, url_prefix="/api")
    app.register_blueprint(search.search_bp, url_prefix="/api")
    print(app.url_map)
    return app

#
# app = Flask(__name__)
# if __name__ == "__main__":
#     app.run(debug=True)
