import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor

import redis
from bs4 import BeautifulSoup
from colorama import Back, Fore, Style, init, AnsiToWin32
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from redis.commands.search.indexDefinition import IndexDefinition

from scraper import scrape_comic
from scraper import grab_chapters_comic
from utils import fetch_url
from utils import gen_log
from utils import base_url

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream


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

        web = fetch_url(f"{base_url}/archive/?archive_year={year}")
        soup = BeautifulSoup(web.text, "html.parser")
        link_tag = soup.find_all(
            "a", {"rel": "bookmark", "href": re.compile("^https://")})

        print(
            f"Found {Fore.GREEN}{Style.BRIGHT}{len(link_tag)}{Style.RESET_ALL} tags!"
        )

        for index, link in enumerate(link_tag, start=1):
            link = link.get("href")

            data = scrape_comic(link, year, index, characters_db)
            # grabs the link title from the keyname and check if that link title
            # is a start of a new chapter. idk why but this comment sounds like a quote lol
            if data["key_name"].split(":")[1] in chapter_data.keys():
                chapter = chapter_data[data["key_name"].split(":")[1]]["ch_name"]

                print(chapter)
            RedisDB.hset(
                data["key_name"],
                # add in the chapter tag
                mapping=data["comic"] | {"chapter": chapter}
            )
            characters_db = data["characters"]

    # put the character list and the list of chapters into redis
    RedisDB.lpush("characters_db", *characters_db)
    RedisDB.lpush("chapter_db", *chapter_data.keys())


with ThreadPoolExecutor(max_workers=50) as executor:
    executor.map(main, range(155))

if __name__ == "__main__":
    main()
