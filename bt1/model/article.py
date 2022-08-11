from mongoengine import *
class Article(Document):
    title = StringField(max_length=200, required=True)
    content = StringField()
    meta = {'collection': 'bt1'}
    
