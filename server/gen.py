import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor

import redis
import requests
from bs4 import BeautifulSoup
from colorama import *
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from redis.commands.search.indexDefinition import IndexDefinition
from scraper import *

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream


def main():
    rs = requests.Session()
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
        TextField("image"),
        NumericField("guest"),
        NumericField("index", sortable=True),
    )

    user_agent = {
        "user-agent": ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)"
                       "AppleWebKit/537.36 (KHTML, like Gecko)"
                       "Chrome/45.0.2454.101 Safari/537.36"),
        "referer":
        "https://www.housepetscomic.com",
    }

    # generate a list of years from 2008 to todays year
    years = [str(x) for x in range(2008, int(time.strftime("%Y")) + 1)]

    # housepets_db = {}
    print(
        f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} Generating Housepets database... {Style.RESET_ALL}"
    )

    characters_db = set()

    for year in years:
        # create an index for the comics pecific year
        index_def = IndexDefinition(prefix=[f"{year}:"],
                                    score=0.5,
                                    score_field="doc_score")

        try:
            print(
                f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} Setting up {year} index... {Style.RESET_ALL}"
            )
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
        link_tag = soup.find_all("a", {
            "rel": "bookmark",
            "href": re.compile("^https://")
        })
        print(
            f"Found {Fore.GREEN}{Style.BRIGHT}{len(link_tag)}{Style.RESET_ALL} tags!"
        )

        for index, link in enumerate(link_tag, start=1):
            link = link.get("href")

            data = scrape_comic(link, year, index, characters_db)

            RedisDB.hset(
                data["key_name"],
                mapping=data["comic"]
            )
            characters_db = data["characters"]

    #   put the character list into redis
    RedisDB.lpush("characters_db", *characters_db)


with ThreadPoolExecutor(max_workers=50) as executor:
    executor.map(main, range(155))

if __name__ == "__main__":
    main()
