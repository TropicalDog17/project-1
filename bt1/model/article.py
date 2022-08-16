from mongoengine import *
from model.comment import Comment
class Article(Document):
    link= StringField(max_length=500, required=True)
    title = StringField(max_length=200, required=True)
    content = StringField()
    comments = ListField(EmbeddedDocumentField(Comment))
    meta = {'collection': 'bt1'}
    
