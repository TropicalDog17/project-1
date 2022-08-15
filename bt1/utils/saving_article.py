
def saving_article(collection, title, content):
    if not collection.objects(title=title):
        article = collection(title=title, content=content).save()
    elif not collection.objects(content=content):
        article = collection(title=title, content=content).save()
    else:
        return



    