from pkgutil import get_data
from dotenv import load_dotenv
import os
load_dotenv("/home/fosec/Tropical/python/training_python_exercises/bt1/.env")
def connect_database():
    from mongoengine import connect
    DB_URI = os.environ.get("DB_URI")
    CONNECTION_STRING = DB_URI
    connect(host=CONNECTION_STRING)
try:
    connect_database()
except:
    raise SystemExit('Error: Can\'t connect to the database')
