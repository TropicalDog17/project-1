import requests


def fetch_mock_data():
    URL = "https://api.json-generator.com/templates/VN-CJ-spR0R-/data"
    JSON_GENERATOR_API_KEY = '6xtyyw7j4e657wf0k31txqz1n7cdlkamdnhulcdp'
    resp = requests.get(URL, headers={'Authorization': f'Bearer {JSON_GENERATOR_API_KEY}'})
    return resp.json()


def retrieve_sql_row_data(row, *args) -> object:
    """

    :param row: a single cursor row
    :param args: list of parameters to be retrieved
    :return:
    """
    result = {}
    for arg in args:
        result[arg] = row[arg]
    return result


def check_if_article_exists(db, article_id):
    c = db.cursor()
    return c.execute("SELECT count(*) FROM article WHERE id=?", (article_id,)).fetchone()[0] > 0
