import re
import requests
import json
from slugify import slugify
from redis import StrictRedis
from redis.exceptions import ResponseError
from redis.commands.search.query import Query

from redis.commands.search.indexDefinition import IndexDefinition
from bs4 import BeautifulSoup
from bs4.element import Tag

from constants import schema

with open("./redis_config.json") as f:
    redis_config = json.load(f)
    housepets_db = StrictRedis(
        host=redis_config["host"],
        port=redis_config["port"],
        username=redis_config["username"],
        password=redis_config["password"],
        decode_responses=True
    )


class Housepets:
    def __init__(self):
        self.hp_url = "https://housepetscomic.com"

    def _soup_req(self, url: str):
        req = requests.get(url, timeout=None)
        return BeautifulSoup(req.text, "html.parser")

    def get_comic_chrono(self, year: int):
        """
        grab a list of Beautifulsoup tag elements of comics from the archive list
        of a year
        """
        url = f"{self.hp_url}/archive/?archive_year={year}"
        page_soup = self._soup_req(url)
        comics = page_soup.find_all(
            "a", {"rel": "bookmark", "href": re.compile("^https://")})

        return comics

    def get_comic_metadata(self, comic_tag: Tag, index: int):
        """
        grab data from a Beautifulsoup tag element for a HP comic
        """

        url = comic_tag["href"]
        parsed_url = url.split("/")
        year = parsed_url[4]
        link_tag = parsed_url[7]
        comic_date = "-".join(parsed_url[6:3:-1])
        comic_soup = self._soup_req(url)
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

        if characters:
            character_str = ",".join(characters)

        return {
            "key_name": f"{year}:{link_tag}",
            "comic": {
                "title": comic_tag["title"],
                "comic_link": url,
                "characters": character_str,
                "date": comic_date,
                "image": comic_image["src"],
                "index": index
            },
            "characters": characters
        }

    def get_chapter_dropdown(self):
        """
        Retrieves the chapter dropdown from the web page
        """
        chapter_dropdown = self._soup_req(f"{self.hp_url}/archive")
        chapter_dropdown = chapter_dropdown.find_all("option", class_="level-0")

        return chapter_dropdown

    def get_chapter_entries(self):
        """
        grabs every chapters and their first comic
        """
        print("grabbing chapters and their first comic")

        first_chapter_comics = dict()

        chapter_dropdown = self.get_chapter_dropdown()

        print(f"going trough {len(chapter_dropdown)} chapters")

        for chapters in chapter_dropdown:
            name_parse = re.sub("^(-|\d)(\d\d).\s", "", chapters.get_text())
            ch_link = chapters["value"]
            chapter_soup = self._soup_req(ch_link)

            pagination = chapter_soup.find("div", class_=re.compile("^mh-loop-pagination"))

            pag_total = 1
            # if there is more than 1 page, get the amount of pages
            if pagination != None:
                pag_total = int(pagination.find_all(
                    "a", class_="page-numbers")[-2].get_text())

            # grabs the first comic from the last page and grabs the first comic
            last_article = self._soup_req(f"{ch_link}/page/{pag_total}/")
            last_article = last_article.find_all("article", id=re.compile("^post-"))[-1]

            first_comic_link = last_article.find("a")["href"]

            print(f"{first_comic_link} : {name_parse}")

            SLICE_URL: int = 48

            first_chapter_comics.update({
                first_comic_link[SLICE_URL:-1]: name_parse
            })

        return first_chapter_comics

    def get_latest_chapter(self):
        chapter_dropdown = self.get_chapter_dropdown()
        latest_chapter = re.sub("^(-|\d)(\d\d).\s", "", chapter_dropdown[-1].get_text())

        return latest_chapter

    def create_index(self, index_name: str):
        """
        creates an index with a prefix with the name inserted
        from index_name
        """
        index_def = IndexDefinition(prefix=[f"{index_name}:"],
                                    score=0.5,
                                    score_field="doc_score")

        try:
            housepets_db.ft(f"{index_name}").create_index(schema, definition=index_def)
        except ResponseError:
            print(f"{index_name} index already exists")

    def get_year_index(self, index_name: str):
        try:
            index_keys = housepets_db.ft(index_name).search(Query("*").paging(0, 500))
        except ResponseError:
            return None

        return index_keys

    def set_slugs(self, key: str, chars: list[str]):
        """
        creates a hash/dict on redis to store data
        for things like characters and chapters to create
        pages using slugs
        """

        slug_dict = {
            # replaced "?" to "0" since "?" is taken
            # as a query starter in Nuxt, this is just
            # a proto for now, may change later
            slugify(x.replace("?", "0")): x for x in chars
        }

        housepets_db.hset(key, mapping=slug_dict)