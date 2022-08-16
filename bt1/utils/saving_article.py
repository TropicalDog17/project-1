
def saving_article(collection, link, title, content,comments=[]):
    """Luu cac thong tin bai bao vao database
    
    Args: 
        collection: se luu cac bai bao vao class nay
        link: url Vnexpress cua bai bao
        title: Tieu de
        content: Noi dung duoi dang text
        comments(optional): Danh sach tat ca cac comment(List)
    """
    if not collection.objects(title=title):
        article = collection(link=link, title=title, content=content, comments=comments).save()
    elif not collection.objects(content=content):
        article = collection(link=link, title=title, content=content, comments=comments).save()
    else:
        return



    