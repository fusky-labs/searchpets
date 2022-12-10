from bs4 import BeautifulSoup
import requests
import re

from utils import fetch_url
from utils import base_url


def get_comic_strip(ch_link: str, pages_amount: int = 1):
    # grab the first comic of a chapter
    if pages_amount != 1:
        url_set = f"{ch_link}page/{pages_amount}/"
    else:
        url_set = ch_link
    gc_url = fetch_url(url_set)
    comic_item = BeautifulSoup(gc_url.text, "html.parser").find_all(
        "article", id=re.compile("^post-"))

    first_comic = comic_item[-1]
    comic_link: str = first_comic.find("a")["href"]
    comic_date: str = first_comic.find(
        "span", class_=re.compile("^mh-meta-date")).get_text()

    return {
        'comic_link': comic_link,
        'comic_date': comic_date,
    }


def get_comic_chapters():
    # grabs the first comic for each chapter

    print("Grabbing the first comic for each chapter...")
    first_chapter_comics = dict()

    # grab the chapters
    archive_url = fetch_url(f"{base_url}/archive/")
    chapter_dropdown = BeautifulSoup(
        archive_url.text, "html.parser").find_all("option", class_="level-0")

    for chapters in chapter_dropdown:
        # !!! What is this regex for, can you explain this
        name_parse = re.sub("^(-|\d)(\d\d).\s", "", chapters.get_text())
        ch_link, ch_name = chapters["value"], name_parse

        chapter_url = fetch_url(ch_link)
        print(ch_link)
        chapter_soup = BeautifulSoup(chapter_url.text, "html.parser")
        # print(chapter_soup)

        pagination = chapter_soup.find(
            "div", class_=re.compile("^mh-loop-pagination"))
        pag_total = 1
        # if there is more than 1 page, get the amount of pages
        if pagination != None:
            pag_total = int(pagination.find_all(
                "a", class_="page-numbers")[-2].get_text())

        # grab the first comic from the chapter
        first_comic = get_comic_strip(ch_link, pag_total)
        first_comic.update({"ch_name": ch_name})

        print({first_comic['comic_link'].split("/")[-2]: first_comic})
        first_chapter_comics.update({
            # uses the link to grab the comic tittle
            first_comic['comic_link'].split("/")[-2]: first_comic
        })

    return first_chapter_comics


def scrape_comic(url: str, year: str, index: int):
    link_page = fetch_url(url)

    comic_soup = BeautifulSoup(link_page.text, "html.parser")
    comic_image = comic_soup.find("img", {
        "title": True,
        "alt": True
    })
    print(comic_image.get("src"))
    link_title = url.split("/")[-2]
    print(link_title)

    # if this variable get's changed that means we have encountered a guest
    guest = 0
    character_str = "guest"
    if "https://www.housepetscomic.com/character" in link_page.text:

        print(url)

        characters = []
        characters_tag = comic_soup.find_all(
            "a", {"href": re.compile(
                "^https://www\.housepetscomic\.com/character")},
        )
        for character in characters_tag:
            characters.append(character.text)

        # change the value from guest to every character in the comics
        character_str = ",".join(characters)

    else:
        print(f"{url} is a guest comics")
        guest = 1 # tell the guest value to change to 1

    return {
        "key_name": f"{year}:{link_title}",
        "comic": {
            "title": comic_soup.title.text.split(" \u2013 ")[0],
            "comic_link": url,
            "characters": character_str,
            "image": comic_image.get("src"),
            "guest": guest,
            "index": index,
        }
    }
