import redis
from redis.commands.search.query import Query
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from redis.commands.search.indexDefinition import IndexDefinition
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
import requests
from bs4 import BeautifulSoup
from colorama import *
from scraper import scrape_comic

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream


def main():
    schema = (
        TextField("title"),
        TextField("comic_link"),
        TagField("characters"),
        TextField("image"),
        NumericField("guest"),
        NumericField("index", sortable=True),
    )
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
    print(
        f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} Updating Housepets database... {Style.RESET_ALL}"
    )

    while True:
        print("waiting 5 secconds")
        time.sleep(5)
        year = time.strftime("%Y")
        characters = RedisDB.lrange("characters_db", 0, -1)
        characters = [character for character in characters]
        characters_db = set(characters)

        print("characters_db length:", len(characters_db))
        index_def = IndexDefinition(prefix=[f"{year}:"],
                                    score=0.5,
                                    score_field="doc_score")

        # grab todays year database hash index
        year_db = RedisDB.ft(year).search(Query("*").paging(0, 500))

        print("year_db length:", year_db.total)

        web = rs.get(
            f"https://www.housepetscomic.com/archive/?archive_year={year}")
        soup = BeautifulSoup(web.text, "html.parser")
        link_tag = soup.find_all("a", {
            "rel": "bookmark",
            "href": re.compile("^https://")
        })

        if len(link_tag) > year_db.total:
            print(len(link_tag))
            print(year_db)
            print(
                f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} New comics found! {Style.RESET_ALL}"
            )
            try:
                print(
                    f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} Setting up {year} index... {Style.RESET_ALL}"
                )
                RedisDB.ft(f"{year}").create_index(
                    schema, definition=index_def)
            except Exception as e:
                print(
                    f"{Back.RED}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} {year} index already exists {Style.RESET_ALL}"
                )

            # fill code to scrape here
            for index, link in enumerate(link_tag, start=1):
                link = link.get("href")

                data = scrape_comic(link, year, index, characters_db)

                RedisDB.hset(
                    data["key_name"],
                    mapping=data["comic"]
                )
                characters_db = data["characters"]

            RedisDB.delete("characters_db")
            RedisDB.lpush("characters_db", *characters_db)


with ThreadPoolExecutor(max_workers=55) as executor:
    executor.map(main, range(155))

if __name__ == "__main__":
    main()
