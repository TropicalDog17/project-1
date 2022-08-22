
def saving_article(collection, link, title, content,comments=[]):
    """Luu cac thong tin bai bao vao database, neu da co du lieu san trung lap thi khong them vao
    
    Args: 
        collection: se luu cac bai bao vao class nay
        link: url Vnexpress cua bai bao
        title: Tieu de
        content: Noi dung duoi dang text
        comments(optional): Danh sach tat ca cac comment(List)
    """
    if not collection.objects(title=title) or not collection.objects(content=content) or not collection.objects(comments=comments): 
        article = collection(link=link, title=title, content=content, comments=comments).save()
    else:
        return



