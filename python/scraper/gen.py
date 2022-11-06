import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor

import redis
import requests
from bs4 import BeautifulSoup
from colorama import Back, Fore, Style, init, AnsiToWin32
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from redis.commands.search.indexDefinition import IndexDefinition

from scraper import scrape_comic

import json

base_url = "https://www.housepetscomic.com"
user_agent = {
    "user-agent": ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)"
                   "AppleWebKit/537.36 (KHTML, like Gecko)"
                   "Chrome/45.0.2454.101 Safari/537.36"),
    "referer": base_url,
}
rs = requests.session()

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream


def fetch_url(url: str):
    return rs.get(url, headers=user_agent, timeout=None)


def gen_log(msg: str) -> str:
    colors = Back.YELLOW + Fore.LIGHTWHITE_EX + Style.BRIGHT
    return colors + msg + Style.RESET_ALL


def get_comics(ch_link: str, pages_amount: int=1):
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


def grab_chapters_comic():
    # grabs the first comic for each chapter

    print("Grabbing the first comic for each chapter...")
    first_chapter_comics = dict()

    # grab the chapters
    archive_url = fetch_url(f"{base_url}/archive/")
    chapter_dropdown = BeautifulSoup(
        archive_url.text, "html.parser").find_all("option", class_="level-0")

    for chapters in chapter_dropdown:
        name_parse = re.sub("^(-|\d)(\d\d).\s", "", chapters.get_text())
        ch_link, ch_name = chapters["value"], name_parse
        
        chapter_url = rs.get(ch_link, headers=user_agent)
        print(ch_link)
        chapter_soup = BeautifulSoup(chapter_url.text, "html.parser")
        # print(chapter_soup)
        pagination = chapter_soup.find("div", class_=re.compile("^mh-loop-pagination"))
        pag_total = 1
        if pagination != None: # if there is more than 1 page, get the amount of pages
            pag_total = int(pagination.find_all("a", class_="page-numbers")[-2].get_text())

        first_comic = get_comics(ch_link, pag_total) # grab the first comic from the chapter
        first_comic.update({"ch_name":ch_name})

        print({first_comic['comic_link'].split("/")[-2]:first_comic})
        first_chapter_comics.update({
            # uses the link to grab the comic tittle
            first_comic['comic_link'].split("/")[-2]:first_comic 
        })
				
    return first_chapter_comics


def main():
    with open("./redis_config.json") as f:
        redis_config = json.load(f)

    print("Connecting to redis...")
    if redis_config["database"]["password"] is None:
        RedisDB = redis.StrictRedis(
            host=redis_config["database"]["host"],
            port=int(redis_config["database"]["port"]),
            username=redis_config["database"]["username"],
            decode_responses=True
        )
    else:
        RedisDB = redis.StrictRedis(
            host=redis_config["database"]["host"],
            port=int(redis_config["database"]["port"]),
            username=redis_config["database"]["username"],
            password=redis_config["database"]["password"],
            decode_responses=True
        )

    schema = (
        TextField("title"),
        TextField("comic_link"),
        TagField("characters"),
        TagField("chapter"),
        TextField("image"),
        NumericField("guest"),
        NumericField("index", sortable=True),
    )
    # generates a dict that has the start comic for every chapter
    gen_log("Grabbing chapters and first comics")
    chapter_data = grab_chapters_comic()
    chapter = ""
    # Generate a list of years from 2008 to today's year
    years = [str(x) for x in range(2008, int(time.strftime("%Y")) + 1)]

    # housepets_db = {}
    gen_log("Generating Housepets database...")

    characters_db = set()

    for year in years:
        # create an index for the comics specific year
        index_def = IndexDefinition(prefix=[f"{year}:"],
                                    score=0.5,
                                    score_field="doc_score")

        try:
            gen_log(f"Setting up {year} index...")
            RedisDB.ft(f"{year}").create_index(schema, definition=index_def)
        except Exception as e:
            print(
                f"{Back.RED}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} {year} index already exists {Style.RESET_ALL}"
            )

        print(
            f"Searching in year {Fore.GREEN}{Style.BRIGHT}{year}{Style.RESET_ALL}"
        )

        web = rs.get(
            f"https://www.housepetscomic.com/archive/?archive_year={year}",
            headers=user_agent,
            timeout=None,
        )
        soup = BeautifulSoup(web.text, "html.parser")
        link_tag = soup.find_all(
            "a", {"rel": "bookmark", "href": re.compile("^https://")})

        print(
            f"Found {Fore.GREEN}{Style.BRIGHT}{len(link_tag)}{Style.RESET_ALL} tags!"
        )

        for index, link in enumerate(link_tag, start=1):
            link = link.get("href")

            data = scrape_comic(link, year, index, characters_db)
            # grabs the link title from the keyname and check if that link tittle
            # is a start of a new chapter. idk why but this comment sounds like a quote lol
            if data["key_name"].split(":")[1] in chapter_data.keys():
                chapter = chapter_data[data["key_name"].split(":")[1]]["ch_name"]
            print(chapter)
            RedisDB.hset(
                data["key_name"],
                mapping=data["comic"] | {"chapter":chapter} # add in the chapter tag
            )
            characters_db = data["characters"]

    # put the character list and the list of chapters into redis
    RedisDB.lpush("characters_db", *characters_db)
    RedisDB.lpush("chapter_db", *chapter_data.keys())


with ThreadPoolExecutor(max_workers=50) as executor:
    executor.map(main, range(155))

if __name__ == "__main__":
    main()
