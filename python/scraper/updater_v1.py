import datetime
import json
import re

import requests
from bs4 import BeautifulSoup

current_date = datetime.datetime.now()
date = current_date.date()
year = date.strftime("%Y")

with open("housepets_db.json", "r") as housepets_db_json:
    housepets_db = json.load(housepets_db_json)

housepets_db.update({year: []})
print(year)
web = requests.get(
    f"https://www.housepetscomic.com/archive/?archive_year={year}")
soup = BeautifulSoup(web.text, "html.parser")
link_tag = soup.find_all("a", {
    "rel": "bookmark",
    "href": re.compile("^https://")
})
print(len(link_tag))
for link in link_tag:
    web_link = link.get("href")
    web_link_page = requests.get(web_link)
    if "https://www.housepetscomic.com/character" in web_link_page.text:
        print(f"{web_link} is a real comic by rick grifin")

        chars = []
        chars_soup = BeautifulSoup(web_link_page.text, "html.parser")
        chars_tag = chars_soup.find_all("a", {
            "href":
            re.compile("^https://www\.housepetscomic\.com/character")
        })
        for character in chars_tag:
            chars.append(character.text)
        comic_image = chars_soup.find("img", {"title": True, "alt": True})
        housepets_db[year].append({
            "title":
            chars_soup.title.text.split(" \u2013 ")[0],
            "comic_link":
            web_link,
            "characters":
            chars,
            "image":
            comic_image.get("src"),
        })

print(housepets_db)
with open("housepets_db.json", "w") as housepets_db_json:
    json.dump(housepets_db, housepets_db_json)
