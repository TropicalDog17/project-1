import re

from celery import Celery
import requests  # pulling data
from bs4 import BeautifulSoup  # xml parsing
import json  # exporting to files
import redis
import uuid

app = Celery('tasks', broker='pyamqp://guest@localhost//')
app.conf.result_backend = 'redis://localhost:6379/0'
SCRAPE_URL_LIST = (
    'https://vnexpress.net/tin-tuc/giao-duc-p' + str(i) for i in range(1, 20))
SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'

r = redis.Redis(host='localhost', port=6379, db=0)
pipe = r.pipeline()


def remove_duplicate_link(links):
    return list(set(links))


def get_article_links(soup):
    return (item["href"] for item in soup.find_all("a", attrs={"href": re.compile("^https://vnexpress.net")}))

@app.task
def scrape_article(article_link):
    article_r = requests.get(article_link)
    article_id = uuid.uuid4()
    article_soup = BeautifulSoup(article_r.content, "lxml")
    article_title = article_soup.find("h1", {"class": "title-detail"}).get_text()
    article_content = article_soup.find("article", {"class": "fck_detail"}).get_text()

    # from each "item"
    pipe.hset(str(article_id), "link", article_link)
    pipe.hset(str(article_id), "title", article_title)
    pipe.hset(str(article_id), "content", article_content)

@app.task
def scrape_page(link):
    req = requests.get(link)
    soup = BeautifulSoup(req.content, "lxml")
    article_links = get_article_links(soup)
    for article_link in article_links:
        scrape_article.delay(article_link)
@app.task
def scraping_vnexpress():
    article_list = []
    try:
        for link in SCRAPE_URL_LIST:
            scrape_page.delay(link)
        pipe.execute()
    except Exception as e:
        print('The scraping job failed. See exception: ')
        print(e)