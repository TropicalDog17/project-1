from api.common.util import retrieve_sql_row_data


def get_article_by_query(db, query_type, query_string):
    try:
        result = []
        if not query_string:
            raise Exception
        elif len(query_string) > 255:
            raise Exception
        rows = db.execute(f"SELECT * FROM article WHERE {query_type} LIKE '%{query_string}%'").fetchall()
        for row in rows:
            result.append(retrieve_sql_row_data(row, 'link', 'title', 'content'))
    except Exception as e:
        if not query_string:
            raise ValueError("Query must not be null")
        elif len(query_string) > 255:
            raise ValueError(f"Maximum length exceeded ({len(query_string)} characters) ")
        print(e)
        raise Exception
    return result



