import requests
from bs4 import BeautifulSoup
from requests_html import HTMLSession

from utils.connect_database import connect_database
from model.article import Article
from time import sleep, perf_counter
from utils.saving_article import saving_article
from utils.fetch_comment import fetch_comment
import re
SCRAPE_URL_LIST = [
    'https://vnexpress.net/tin-tuc/giao-duc-p' + str(i) for i in range(1, 21)]
SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
RETRY_LIMIT = 15  # After 15 second without connection, the scraping will stop

# Connect to MongoDB Atlas
connect_database()
page = int(input("Enter number of pages: "))
start_time = perf_counter()
session = HTMLSession()
for index in range(0, page):
    try:
        r = session.get(SCRAPE_URL_LIST[index])
    except requests.ConnectionError as e:
        print("Connection error", e)
    r.html.render(timeout=60)
    soup = BeautifulSoup(r.html.html, "html.parser")

    article_links = [item["href"]
                     for item in soup.find_all("a", attrs={"href": re.compile("^https://vnexpress.net")})]
    article_links = list(set(article_links))
    # Article.objects().delete()
    # List chua cac link lap lai, do do su dung set de loai bo trung lap
    for i in list(set(article_links)):
        # Loai bo cac link rac
        if i[-5:] != ".html":
            continue
        file_downloaded = False
        retries = 0
        # Truy cap vao tung bai viet va trich xuat tieu de + noi dung
        while file_downloaded == False and retries < RETRY_LIMIT:
            try:
                r = session.get(i)
                r.html.render(timeout=60)
                article_soup = BeautifulSoup(r.html.html, "html.parser")
                article_title = article_soup.find("h1", {"class": "title-detail"}).get_text()
                print(article_title)
                article_content = article_soup.find("article", {"class": "fck_detail"}).get_text()
                article_comment = fetch_comment(article_soup)
                # print(article_comment)
                saving_article(Article, link=i, title=article_title, content=article_content ,comments=article_comment)
                file_downloaded = True
                if retries != 0:
                    retries = 0
                    print("Resumed downloading...")
            except (requests.ConnectionError, requests.Timeout):
                file_downloaded = False
                print(f"Network error. Attempting {retries} to resume downloading...")
                sleep(1)
                retries += 1
                if retries >= RETRY_LIMIT:
                    print("Can't connect to the internet. Exiting...")

end_time = perf_counter()
print(f'It took {end_time - start_time: 0.2f} second(s) to complete scraping page {index + 1}')


