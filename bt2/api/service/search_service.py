from api.common.util import retrieve_sql_row_data


def get_article_by_title(db, query):
    try:
        result = []
        if not query:
            raise Exception
        elif len(query) > 255:
            raise Exception
        rows = db.execute(f'SELECT * FROM article WHERE title LIKE "%{query}%"').fetchall()
        for row in rows:
            result.append(retrieve_sql_row_data(row, 'link', 'title', 'content'))
    except Exception as e:
        if not query:
            raise ValueError("Query must not be null")
        elif len(query) > 255:
            raise ValueError(f"Maximum length exceeded ({len(query)} characters) ")
        raise Exception
    return result
