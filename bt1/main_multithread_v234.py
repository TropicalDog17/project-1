import re
import threading
import time
from time import sleep, perf_counter
from requests_html import HTMLSession
from model.article import Article
from utils.connect_database import connect_database
from utils.fetch_comment import *
from utils.saving_article import saving_article

SCRAPE_URL_LIST = [
    'https://vnexpress.net/tin-tuc/giao-duc-p' + str(i) for i in range(1, 21)]

SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
RETRY_LIMIT = 15  # After 15 second without connection, the scraping will stop
MAX_DURATION = 3600 * 24  # seconds
# Connect to MongoDB Atlas
connect_database()


def scrape_worker(article_links, start, end):
    session = HTMLSession()
    for i in article_links[start:end]:
        # Loai bo cac link rac khong thuoc VnExpress
        if i.find("https://vnexpress.net") == -1:
            continue
        # Truy cap vao tung bai viet va trich xuat tieu de + noi dung
        r = session.get(i)
        r.html.render(timeout=60)
        article_soup = BeautifulSoup(r.html.html, "lxml")
        article_title = article_soup.find(
            "h1", {"class": "title-detail"}).get_text()
        article_content = article_soup.find(
            "article", {"class": "fck_detail"}).get_text().replace("\n", " ")
        # article = Article(title=article_title, content=article_content).save()
        saving_article(Article, article_title, article_content)


def scrape_worker_new(scrape_url, start, end):
    page = requests.get(scrape_url)
    soup = BeautifulSoup(page.content, "html.parser")
    article_links = [item["href"]
                     for item in soup.find_all("a", attrs={"href": re.compile("^https://vnexpress.net")})]
    article_links = list(set(article_links))
    count = 0
    for i in article_links[start:end]:
        if i[-5:] != ".html":
            continue
        file_downloaded = False
        retries = 0
        while file_downloaded is False and retries < RETRY_LIMIT:
            try:
                article_page = requests.get(i, timeout=2)
                article_soup = BeautifulSoup(
                    article_page.content, "lxml")
                article_title = article_soup.find(
                    "h1", "title-detail").get_text()
                article_content = article_soup.find(
                    "article", "fck_detail").get_text().replace("\n", " ")
                saving_article(Article, i, article_title, article_content)
                count += 1
                file_downloaded = True
                if retries != 0:
                    retries = 0
            except (requests.ConnectionError, requests.Timeout):
                file_downloaded = False
                sleep(1)
                retries += 1
                if retries >= RETRY_LIMIT:
                    print("Can't connect to the internet. Exiting...")
                    sys.exit()
            except Exception as e:
                print(e)
    print(count)


def multi_threaded_scrape(num_of_threads, article_links):
    thread_list = [0] * num_of_threads
    len_l = len(article_links)

    for i in range(num_of_threads):
        thread_list[i] = threading.Thread(target=scrape_worker_new, args=(
            article_links, len_l * i // num_of_threads, len_l * (i + 1) // num_of_threads))
        thread_list[i].start()
    for i in range(num_of_threads):
        thread_list[i].join()


# List chua cac link lap lai, do do su dung set de loai bo trung lap
if __name__ == "__main__":
    # Article.objects().delete()
    timeout = 0

    """Scrape lai du lieu sau moi khoang thoi gian nhat dinh,
     duy tri chay trong thoi gian cho truoc(MAX_DURATION)"""
    index = int(input("Nhap so trang muon scrape"))
    while timeout < MAX_DURATION:
        try:
            start_time = perf_counter()
            for i in range(0, index):
                multi_threaded_scrape(8, SCRAPE_URL_LIST[i])
            print("Done!!!")
            end_time = perf_counter()
            print(
                f'It took {end_time - start_time: 0.2f} second(s) to complete.')
            time.sleep(60)
            timeout += 60
        except Exception as e:
            print(e)
            sys.exit("Exception")
