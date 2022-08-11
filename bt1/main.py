import requests
from bs4 import BeautifulSoup
from utils.get_database import get_database
from model.article import Article
from time import sleep, perf_counter

SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
import threading
#Connect to MongoDB Atlas
try:
  get_database()
except:
  print("An exception occurred")
  exit()

page = requests.get(SCRAPE_URL)
soup = BeautifulSoup(page.content, "html.parser")

article_links = [item["href"] for item in soup.find_all('a', attrs={'data-medium': True})]

# Article.objects().delete()
start_time = perf_counter()

#List chua cac link lap lai, do do su dung set de loai bo trung lap
for i in list(set(article_links)): 
    #Loai bo cac link rac khong thuoc VnExpress
    if(i.find("https://vnexpress.net") == -1):
        continue
    #Truy cap vao tung bai viet va trich xuat tieu de + noi dung
    article_page = requests.get(i)
    article_soup = BeautifulSoup(article_page.content, "html.parser")
    article_title = article_soup.find("h1",{"class": "title-detail"}).get_text()
    article_content = article_soup.find("article", {"class": "fck_detail"}).get_text()

    article = Article(title=article_title, content=article_content).save()
    #Lul
end_time = perf_counter()
print(f'It took {end_time- start_time: 0.2f} second(s) to complete.')



