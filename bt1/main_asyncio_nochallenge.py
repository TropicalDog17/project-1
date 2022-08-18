from bs4 import BeautifulSoup
from model.article import Article
import asyncio
import aiohttp
from requests_html import *
from utils.saving_article import saving_article
from utils.connect_database import connect_database
from utils.fetch_comment import fetch_comment
from utils.print_time_elapsed import *
import time
import re
import os
connect_database()

PAGE_MAX_NUM = 20
SCRAPE_URL_LIST = ['https://vnexpress.net/tin-tuc/giao-duc-p' + str(i) for i in range(1, PAGE_MAX_NUM + 1)]
print(len(SCRAPE_URL_LIST))
# print(SCRAPE_URL_LIST)
SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
RETRY_LIMIT = 15
def parse(html):
    soup = BeautifulSoup(html, "lxml")
    return soup

async def get_data(asession,i):
    try:
        print("Scrape the main url")
        if i not in range(0, PAGE_MAX_NUM):
            print("Invalid page index")
            sys.exit()
        print(i)
        r = await asession.get(SCRAPE_URL_LIST[i])
        await r.html.arender(timeout=60)
        # await r.html.arender(timeout=60)
        soup = parse(r.html.html)
        article_links = [item["href"]
                for item in soup.find_all("a", attrs={"href": re.compile("^https://vnexpress.net")})]
        article_links = list(set(article_links))
        count = 0
        for i in article_links:
            if(i[-5:] != ".html"):
                continue
            file_downloaded = False
            retries = 0
            while (file_downloaded == False and retries < RETRY_LIMIT):
                try:
                    file_downloaded = False
                    r = await asession.get(i)
                    # await r.html.arender(timeout=60)
                    await r.html.arender(timeout = 60)
                    article_soup = parse(r.html.html)
                    print(i)
                    article_title  = article_soup.find(
                                "h1", re.compile("title[\S]*")).get_text()
                    article_content = article_soup.find(
                                "article", "fck_detail").get_text().replace("\n", " ")
                    article_comments = fetch_comment(article_soup)

                    print_time_elapsed(saving_article, Article, i, article_title, article_content, comments=article_comments)
                    
                    file_downloaded = True
                    count += 1
                    if(retries != 0):
                        retries = 0 
                        print("Resumed downloading...")
                except (requests.ConnectionError, requests.Timeout):
                    file_downloaded = False
                    print(f"Network error. Attempting {retries} to resume downloading...")
                    time.sleep(1)
                    retries += 1
                    if (retries >= RETRY_LIMIT):
                        print("Can't connect to the internet. Exiting...")
                        sys.exit()
        print(count)
    except (requests.ConnectionError, requests.Timeout) as e:
        file_downloaded = False
        print(f"Network error. Attempting {retries} to resume downloading...")
        time.sleep(1)
        retries += 1
        if(retries >= RETRY_LIMIT):
            print("Can't connect to the internet. Exiting...")


async def main():
    start = int(input("Nhap vao so trang muon scrape: "))
    start_time = time.perf_counter()
    async with aiohttp.ClientSession() as asession:
        tasks = []
        for i in range(1, start + 1):
            tasks.append(asyncio.create_task(get_data(asession, i-1)))
        await asyncio.gather(*tasks)
    end_time = time.perf_counter()
    print(f'It took {end_time- start_time: 0.2f} second(s) to complete.')
if __name__ == "__main__":
    asyncio.run(main())
        