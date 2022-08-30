from api.common.util import retrieve_sql_row_data, check_if_article_exists
from operator import itemgetter

def get_all_articles(db):
    result = []
    try:
        rows = db.execute('SELECT * FROM article').fetchall()
        for row in rows:
            result.append(retrieve_sql_row_data(row, "id", "link", "title", "content"))
    except Exception as e:
        print(e)
        raise Exception("Unexpected error")
    return result

def get_articles_pagination(db,data):
    limit = data['limit']
    page = data['page']

    try:
        if not limit or not page:
            raise Exception
        if limit < 1 or page < 1:
            raise Exception

        result = []
        offset = limit * (page - 1)
        rows = db.execute(f'SELECT * FROM article LIMIT {limit} OFFSET {offset}').fetchall()
        for row in rows:
            result.append(retrieve_sql_row_data(row, "id", "link", "title", "content"))
    except Exception as e:
        raise ValueError("Value must be greater than 0")

    return result


def get_one_article(db, article_id):
    result = {}
    cursor = db.cursor()
    try:
        article_id = int(article_id)
        if type(article_id) is not int:
            raise Exception
        cursor.execute(f'SELECT * FROM article WHERE id={article_id}')
        row = cursor.fetchone()
        result = retrieve_sql_row_data(row, "id", "link", "title", "content")
        if cursor.rowcount == 0:
            raise Exception
    except Exception as e:
        if type(article_id) is not int:
            raise TypeError("Please provide an integer")
        print(e)
        raise ValueError("Article not found")
    return result


def insert_one_article(db, data):
    link, title, content = itemgetter('link', 'title', 'content')(data)
    print(data)
    try:
        if not link or not title or not content:
            raise Exception

        row = db.execute('''INSERT INTO article (link, title,content) VALUES (?, ?, ?)''', (link, title, content))
        db.commit()
    except Exception as e:
        if not link:
            raise ValueError("Please provide link")
        elif not title:
            raise ValueError("Please provide title")
        elif not content:
            raise ValueError("Please provide content")
        else:
            print(e)
        raise Exception
    return {'id': row.lastrowid, 'link': link, 'title': title, content: 'content'}


def delete_one_article(db, data):
    article_id = data
    cursor = db.cursor()
    try:
        if not article_id:
            raise ValueError
        article_id = int(article_id)
        if type(article_id) is not int:
            raise Exception()
        if check_if_article_exists(db, article_id):
            cursor.execute(f'DELETE FROM article WHERE id={article_id}')
            db.commit()
        else:
            raise ValueError
    except ValueError as ve:
        if not check_if_article_exists(db, article_id):
            raise ValueError("Article not found")
        raise ValueError("Please provide article id")
    except Exception as e:
        raise Exception("Unexpected error")