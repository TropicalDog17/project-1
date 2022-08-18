from mongoengine import *
class Comment(EmbeddedDocument):
    user = StringField(max_length=200, required=True)
    content = StringField(max_length=20000, require=True)    