from api.common.util import retrieve_sql_row_data
from operator import itemgetter

def get_all_articles(db):
    result = []
    try:
        rows = db.execute('SELECT * FROM article').fetchall()
        for row in rows:
            result.append(retrieve_sql_row_data(row, "id", "link", "title", "content"))
    except Exception as e:
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
        offset = limit * page
        rows = db.execute(f'SELECT * FROM article LIMIT {limit} OFFSET {offset}').fetchall()
        for row in rows:
            result.append(retrieve_sql_row_data(row, "id", "link", "title", "content"))
    except Exception as e:
        raise ValueError("Value must be greater than 0")

    return result


def get_one_article(db, article_id):
    result = {}
    try:
        article_id = int(article_id)
        if type(article_id) is not int:
            raise Exception
        row = db.execute(f'SELECT * FROM article WHERE id={article_id}').fetchone()
        result = retrieve_sql_row_data(row, "id", "link", "title", "content")
        if row is None:
            raise Exception
    except Exception as e:
        if type(article_id) is not int:
            raise TypeError("Please provide an integer")
        elif row is None:
            raise ValueError("Article not found")
    return result


def insert_one_article(db, data):
    link, title, content = itemgetter('link', 'title', 'content')(data)
    try:
        if not link or not title or not content:
            raise Exception

        row = db.execute('''INSERT INTO article (link, title,content) VALUES (?, ?, ?)''', (link, title, content))
        db.commit()
        return {'id': row.lastrowid, 'link': link, 'title': title, content: 'content'}
    except Exception as e:
        if not link:
            raise ValueError("Please provide link")
        if not title:
            raise ValueError("Please provide title")
        if not content:
            raise ValueError("Please provide content")
        raise Exception