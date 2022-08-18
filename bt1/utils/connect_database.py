from dotenv import load_dotenv
import os

load_dotenv()


def connect_database():
    from mongoengine import connect
    DB_URI = os.environ.get("DB_URI")
    CONNECTION_STRING = DB_URI
    connect(host=CONNECTION_STRING)


try:
    connect_database()
except Exception as e:
    # print(e)
    raise SystemExit('Error: Can\'t connect to the database')
