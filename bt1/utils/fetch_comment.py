import sys
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))
from bs4 import BeautifulSoup
from requests_html import HTMLSession
from model.comment import Comment
session = HTMLSession()






def add_colon(element):
    """
    Each comment element contain 2 part: User element and Text content, 
    ":" is inserted at the end of user element's content to seperate User with Text content for later use
    """
    extraSoup = BeautifulSoup(
        '<span class="additional-content">: </span>', 'html.parser')
    element.insert(1, extraSoup.span)
    return element



def fetch_comment(link):
    """Fetches VNExpress' comments from VNExpress 

    Args: 
        link: article link
    
    Returns:
        A list of Comment documents 
    """
    r = session.get(link)
    r.html.render(timeout=60)
    soup = BeautifulSoup(r.html.html, "lxml")
    a = soup.find_all("p", "full_content")  # Normal comments
    # Very long comments have different html class
    b = soup.find_all("p", "content_more")
    result = []
    for i in a + b:
        element_content = add_colon(i).get_text()
        colon_index = element_content.find(":")
        comment = Comment(user=element_content[:colon_index], content=element_content[colon_index:])
        result.append(comment)
    return result
if __name__ == "__main__":
    result = fetch_comment("https://vnexpress.net/hoc-sinh-lop-10-trut-ganh-nang-chon-to-hop-4499373.html")
    for comment in result:
        print(comment.user)
