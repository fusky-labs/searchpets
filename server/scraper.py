from bs4 import BeautifulSoup
from colorama import *
import requests
import re

def scrape_comic(url, year, index, characters_db):
    character_db = characters_db
    user_agent = {
    "user-agent": ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)"
                   "AppleWebKit/537.36 (KHTML, like Gecko)"
                   "Chrome/45.0.2454.101 Safari/537.36"),
    "referer":
        "https://www.housepetscomic.com",
    }
    rs = requests.Session()
    link_page = rs.get(url, headers=user_agent, timeout=None)

    comic_soup = BeautifulSoup(link_page.text, "html.parser")
    comic_image = comic_soup.find("img", {
            "title": True,
            "alt": True
        })
    print(comic_image.get("src"))
    link_title = url.split("/")[-2]
    print(link_title)

    guest = 0 # if this variable get's changed that means we have encountered a 
    characterstring = "guest"
    if "https://www.housepetscomic.com/character" in link_page.text:

        print(url)

        characters = []
        characters_tag = comic_soup.find_all(
            "a",
            {
                "href":
                re.compile(
                    "^https://www\.housepetscomic\.com/character")
            },
        )
        for character in characters_tag:
            characters.append(character.text.lower())
            character_db.add(character.text.lower())

        characterstring = ",".join(characters)
        
    else:
        print(
            f"{Fore.BLACK}{Back.LIGHTWHITE_EX}{Style.BRIGHT}{url} is a guest comics{Style.RESET_ALL}"
        )

    return {
        "key_name":f"{year}:{link_title}",
        "comic":{
            "title":
                comic_soup.title.text.split(" \u2013 ")[0],
            "comic_link": url,
            "characters": characterstring,
            "image": comic_image.get("src"),
            "guest":guest,
            "index": index,
        },
        "characters": character_db   
    }
    