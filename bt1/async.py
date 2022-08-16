from bs4 import BeautifulSoup
from model.article import Article
import asyncio
import aiohttp
from requests_html import AsyncHTMLSession
from utils.saving_article import saving_article
from utils.connect_database import connect_database
from utils.fetch_comment import fetch_comment
SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
connect_database()
def parse(html):
    soup = BeautifulSoup(html, "lxml")
    return soup

async def get_data():
    r = await asession.get(SCRAPE_URL)
    await r.html.arender(timeout=60)
    soup = parse(r.html.html)
    article_links = [item["href"]
                 for item in soup.find_all('a', attrs={'data-medium': True})]
    article_links = list(set(article_links))
        
    for i in article_links:
        if(i[-5:] != ".html"):
            continue
        r = await asession.get(i)
        print(i)
        await r.html.arender(timeout=60)
        article_soup = parse(r.html.html)
        article_title  = article_soup.find(
                    "h1", "title-detail").get_text()
        article_content = article_soup.find(
                    "article", "fck_detail").get_text().replace("\n", " ")
        article_comments = fetch_comment(article_soup)
        print(article_title)
        saving_article(Article, i, article_title, article_content, comments=article_comments)
if __name__ == "__main__":
    asession = AsyncHTMLSession()
    asession.run(get_data)
        
