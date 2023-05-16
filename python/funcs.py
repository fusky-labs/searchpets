"""

DO NOT USE; ONLY FOR CROSS REFERENCE

"""

import re
import requests
import json
import redis
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from redis.commands.search.indexDefinition import IndexDefinition
from bs4 import BeautifulSoup


class Housepets:
    def __init__(self):
        pass
        self.hp_url = "https://housepetscomic.com"

    def soup_req(self, url: str):
        req = requests.get(url, timeout=None)
        return BeautifulSoup(req.text, "html.parser")

    def get_comic_chrono(self, year: int):
        """
        grab a list of Beautifulsoup tag elements of comics from the archive list
        of a year
        """
        url = f"{self.hp_url}/archive/?archive_year={year}"
        page_soup = self.soup_req(url)
        comics = page_soup.find_all(
            "a", {"rel": "bookmark", "href": re.compile("^https://")})
        return comics

    def get_comic_metadata(self, comic_tag, index):
        """
        grab data from a Beautifulsoup tag element for a HP comic
        """
        url = comic_tag["href"]
        year = url.split("/")[4]
        link_tag = url.split("/")[7]
        comic_soup = self.soup_req(url)
        comic_image = comic_soup.find("img", {
            "title": True,
            "alt": True
        })
        character_str = "guest"

        characters = [
            character.text for character in comic_soup.find_all(
                "a", {"href": re.compile(
                    "^https://www\.housepetscomic\.com/character")},
            )
        ]

        if len(characters) != 0:
            character_str = ",".join(characters).lower()

        return {
            "key_name": f"{year}:{link_tag}",
            "comic": {
                "title": comic_tag["title"],
                "comic_link": url,
                "characters": character_str,
                "image": comic_image["src"],
                "index": index
            },
            "characters": characters
        }

    def get_chapter_entries(self):
        """
        grabs every chapters and their first comic
        """
        print("grabbing chapters and their first comic")

        first_chapter_comics = dict()

        chapter_dropdown = self.soup_req(
            f"{self.hp_url}/archive").find_all("option", class_="level-0")

        print(f"going trough {len(chapter_dropdown)} chaoters")

        for chapters in chapter_dropdown:
            name_parse = re.sub("^(-|\d)(\d\d).\s", "", chapters.get_text())
            ch_link = chapters["value"]
            chapter_soup = self.soup_req(ch_link)

            pagination = chapter_soup.find(
                "div", class_=re.compile("^mh-loop-pagination"))

            pag_total = 1
            # if there is more than 1 page, get the amount of pages
            if pagination != None:
                pag_total = int(pagination.find_all(
                    "a", class_="page-numbers")[-2].get_text())

            # grabs the first comic from the last page and grabs the first comic
            last_article = self.soup_req(f"{ch_link}/page/{pag_total}/").find_all(
                "article", id=re.compile("^post-"))[-1]

            first_comic_link = last_article.find("a")["href"]

            print(f"{first_comic_link} : {name_parse}")

            SLICE_URLL: int = 48

            first_chapter_comics.update({
                # uses the link to grab the comic title
                first_comic_link[SLICE_URLL:-1]: name_parse
            })
        return first_chapter_comics


schema = (
    TextField("title"),
    TextField("comic_link"),
    TagField("characters"),
    TagField("chapter"),
    TextField("image"),
    NumericField("index", sortable=True),
)

with open("./redis_config.json") as f:
    redis_config = json.load(f)
    RedisDB = redis.StrictRedis(
        host=redis_config["host"],
        port=redis_config["port"],
        username=redis_config["username"],
        password=redis_config["password"],
        decode_responses=True
    )
