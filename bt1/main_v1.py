import requests
from bs4 import BeautifulSoup
from utils.connect_database import connect_database
from model.article import Article
from time import sleep, perf_counter

SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
RETRY_LIMIT = 15 #After 15 second without connection, the scraping will stop

#Connect to MongoDB Atlas
connect_database()

try:
    page = requests.get(SCRAPE_URL)
except requests.ConnectionError as e :
    print("Connection error", e)
soup = BeautifulSoup(page.content, "html.parser")

article_links = [item["href"] for item in soup.find_all('a', attrs={'data-medium': True})]
# Article.objects().delete()
start_time = perf_counter()
#List chua cac link lap lai, do do su dung set de loai bo trung lap
for i in list(set(article_links)): 
    #Loai bo cac link rac khong thuoc VnExpress
    if(i.find("https://vnexpress.net") == -1):
        continue
    file_downloaded = False
    retries = 0
    #Truy cap vao tung bai viet va trich xuat tieu de + noi dung
    while(file_downloaded == False and retries < RETRY_LIMIT):
        try:
            article_page = requests.get(i, timeout=2)
            article_soup = BeautifulSoup(article_page.content, "html.parser")
            article_title = article_soup.find("h1",{"class": "title-detail"}).get_text()
            article_content = article_soup.find("article", {"class": "fck_detail"}).get_text()
            article = Article(title=article_title, content=article_content).save()
            file_downloaded = True
            if(retries != 0):
                retries = 0 
                print("Resumed downloading...")
        except (requests.ConnectionError, requests.Timeout):
            file_downloaded = False
            print(f"Network error. Attempting {retries} to resume downloading...")
            sleep(1)
            retries += 1
            if(retries >= RETRY_LIMIT):
                print("Can't connect to the internet. Exiting...")


    
    
end_time = perf_counter()
print(f'It took {end_time- start_time: 0.2f} second(s) to complete.')



