import sys
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))
from model.article import Article
from connect_database import connect_database


def clear_collection(Model):
    Model.objects().delete()


if __name__ == "__main__":
    connect_database()
    clear_collection(Article)
