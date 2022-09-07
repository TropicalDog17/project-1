import re

from celery import Celery, group
import requests  # pulling data
from bs4 import BeautifulSoup  # xml parsing
import json  # exporting to files
import redis
import uuid
import json

app = Celery('tasks', broker='pyamqp://guest@localhost//', backend='redis://localhost:6379/1')

r = redis.Redis(host='localhost', port=6379, db=0)
pipe = r.pipeline()
def remove_duplicate_link(links):
    return list(set(links))


@app.task()
def scrape_article(article_link):
    article_r = requests.get(article_link)
    article_id = uuid.uuid4()
    article_soup = BeautifulSoup(article_r.content, "lxml")
    article_title = article_soup.find("h1", {"class": "title-detail"}).get_text()
    article_content = article_soup.find("article", {"class": "fck_detail"}).get_text()
    # from each "item"
    pipe.hset(str(article_id), "link", article_link)
    pipe.hset(str(article_id),"title", article_title)
    pipe.hset(str(article_id), "content", article_content)
    pipe.execute()


@app.task(ignore_result=True)
def get_article_links(page_link):
    result = []
    req = requests.get(page_link)
    soup = BeautifulSoup(req.content, "lxml")
    for item in soup.find_all("a", attrs={"href": re.compile("^https://vnexpress.net")}):
        result.append(item["href"])
    return result


@app.task(ignore_result=True)
def scrape_page(article_links):
    for i in article_links:
        scrape_article.delay(i)
