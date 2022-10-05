from tasks import get_article_links, scrape_page
SCRAPE_URL_LIST = (
    'https://vnexpress.net/tin-tuc/giao-duc-p' + str(i) for i in range(1, 20))
SCRAPE_URL = 'https://vnexpress.net/tin-tuc/giao-duc'
def scraping_vnexpress():
    try:
        for i in SCRAPE_URL_LIST:
            (get_article_links.s(i) | scrape_page.s()).apply_async()
    except Exception as e:
        print('The scraping job failed. See exception: ')
        print(e)
if __name__ == "__main__":
    scraping_vnexpress()