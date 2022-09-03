import os

from flask import Flask, g

from api.resources import auth
from flask_jwt_extended import JWTManager


def create_app(test_config=None):
    # create and configure the app
    BASEDIR = os.path.abspath(os.path.dirname(os.path.abspath((os.path.dirname(__file__)))))
    app = Flask(__name__, instance_path=f'{BASEDIR}/instance')
    app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
    jwt = JWTManager(app)

    # Overriding default message when missing or invalid JWT token
    @jwt.token_verification_loader
    @jwt.unauthorized_loader
    @jwt.invalid_token_loader
    def my_loader(jwt_payload, jwt_token):
        return {"message": "Invalid token"}, 401

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'dbapi.sqlite'),
    )
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
    app.register_blueprint(auth.auth_bp, url_prefix="/api")
    return app

#

