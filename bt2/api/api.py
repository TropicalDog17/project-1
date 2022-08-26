from flask import Flask, request
from flask_restful import Resource, Api
from common.util import fetch_mock_data

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)
