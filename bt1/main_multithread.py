from audioop import mul
from concurrent.futures import thread
from unicodedata import name
import requests
from bs4 import BeautifulSoup
from utils.connect_database import connect_database
from model.article import Article
import threading
import sys
from time import sleep, perf_counter
from utils.saving_article import saving_article
import time
SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
RETRY_LIMIT = 15  # After 15 second without connection, the scraping will stop
MAX_DURATION = 3600*24 #seconds
# Connect to MongoDB Atlas


def scrape_worker(article_links, start, end):
    for i in article_links[start:end]:
        # Loai bo cac link rac khong thuoc VnExpress
        if (i.find("https://vnexpress.net") == -1):
            continue
        # Truy cap vao tung bai viet va trich xuat tieu de + noi dung

        article_page = requests.get(i)
        article_soup = BeautifulSoup(article_page.content, "html.parser")
        article_title = article_soup.find(
            "h1", {"class": "title-detail"}).get_text()
        article_content = article_soup.find(
            "article", {"class": "fck_detail"}).get_text().replace("\n", " ")

        # article = Article(title=article_title, content=article_content).save()
        saving_article(Article, article_title, article_content)


def scrape_worker_new(article_links, start, end):
    for i in article_links[start:end]:
        if (i.find("https://vnexpress.net") == -1):
            continue
        file_downloaded = False
        retries = 0
        while (file_downloaded == False and retries < RETRY_LIMIT):
            try:
                article_page = requests.get(i, timeout=2)
                article_soup = BeautifulSoup(
                    article_page.content, "html.parser")
                article_title = article_soup.find(
                    "h1", {"class": "title-detail"}).get_text()
                article_content = article_soup.find(
                    "article", {"class": "fck_detail"}).get_text()
                saving_article(Article, article_title, article_content)
                file_downloaded = True
                if (retries != 0):
                    retries = 0
            except (requests.ConnectionError, requests.Timeout):
                file_downloaded = False
                sleep(1)
                retries += 1
                if (retries >= RETRY_LIMIT):
                    print("Can't connect to the internet. Exiting...")
                    raise Exception


def multi_threaded_scrape(num_of_threads):
    thread_list = [0]*num_of_threads
    len_l = len(article_links)

    for i in range(num_of_threads):
        thread_list[i] = threading.Thread(target=scrape_worker_new, args=(
            article_links, len_l*i//num_of_threads, len_l*(i+1)//num_of_threads))
        thread_list[i].start()
    for i in range(num_of_threads):
        thread_list[i].join()


connect_database()
page = requests.get(SCRAPE_URL)
soup = BeautifulSoup(page.content, "html.parser")

article_links = [item["href"]
                 for item in soup.find_all('a', attrs={'data-medium': True})]
# List chua cac link lap lai, do do su dung set de loai bo trung lap
article_links = list(set(article_links))


if __name__ == "__main__":
    # Article.objects().delete()
    timeout = 0


    """Scrape lai du lieu sau moi khoang thoi gian nhat dinh,
     duy tri chay trong thoi gian cho truoc(MAX_DURATION)"""
    while(timeout < MAX_DURATION):
      try:
          start_time = perf_counter()
          multi_threaded_scrape(8)
          print("Done!!!")
          end_time = perf_counter()
          print(f'It took {end_time- start_time: 0.2f} second(s) to complete.')
          time.sleep(60)
          timeout += 60
      except Exception as e:
          sys.exit("Exception")
