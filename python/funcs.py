import requests
from bs4 import BeautifulSoup
import re


class Housepets:
    def __init__(self):
        pass
        self.hp_url = "https://housepetscomic.com"

    def soup_req(self, url: str):
        req = requests.get(url, timeout=None)
        return BeautifulSoup(req.text, "html.parser")

    def get_comics(self, year: int):
        """
        grab a list of Beautifulsoup tag elements of comics from the archive list
        of a year
        """
        url = f"{self.hp_url}/archive/?archive_year={year}"
        page_soup = self.soup_req(url)
        comics = page_soup.find_all(
            "a", {"rel": "bookmark", "href": re.compile("^https://")})
        return comics

    def get_comic(self, comic_tag, index):
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
        guest = 0
        character_str = "guest"

        characters = [
            character.text for character in comic_soup.find_all(
                "a", {"href": re.compile(
                    "^https://www\.housepetscomic\.com/character")},
            )
        ]
        if len(characters) == 0:
            guest = 1
        else:
            character_str = ",".join(characters).lower()

        return {
            "key_name": f"{year}:{link_tag}",
            "comic": {
                "title": comic_tag["title"],
                "comic_link": url,
                "characters": character_str,
                "image": comic_image["src"],
                "guest": guest,
                "index": index
            },
            "characters": characters
        }

    def get_comic_data(self, ch_link, pages_amount):
        """
        this function works by grabbing the first comic
        of a chapter
        """
        if pages_amount != 1: ch_link = f"{ch_link}page/{pages_amount}/"
        first_comic = self.soup_req(ch_link).find_all(
            "article", id=re.compile("^post-"))[-1]
        return first_comic.find("a")["href"]

    def get_chapters_comic(self):
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
            # grab the first comic from the chapter
            first_comic = self.get_comic_data(ch_link, pag_total)
            print(f"{first_comic} : {name_parse}")
            first_chapter_comics.update({
                # uses the link to grab the comic tittle
                first_comic[48:-1]: name_parse
            })
        return first_chapter_comics
