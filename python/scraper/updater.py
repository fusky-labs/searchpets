import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor

from bs4 import BeautifulSoup
from colorama import Back, Fore, Style, init, AnsiToWin32
from redis.commands.search.query import Query
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from redis.commands.search.indexDefinition import IndexDefinition

from scraper import scrape_comic, get_comic_chapters
from utils import fetch_url, gen_log, connect_redis
from utils import BASE_URL

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream


def main():
    RedisDB = connect_redis("./redis_config.json")
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
    
    # housepets_db = {}
    gen_log("Generating Housepets database...")

    characters_db = set()

    while True:
        time.sleep(5)
        year = time.strftime("%Y")

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
        index_comic_data = RedisDB.ft(year).search(Query("*").paging(0, 500))

        web = fetch_url(f"{BASE_URL}/archive/?archive_year={year}")
        soup = BeautifulSoup(web.text, "html.parser")
        link_tag = soup.find_all(
            "a", {"rel": "bookmark", "href": re.compile("^https://")})

        print(
            f"Found {Fore.GREEN}{Style.BRIGHT}{len(link_tag)}{Style.RESET_ALL} tags!"
        )
        print(index_comic_data.total, len(link_tag))
        if index_comic_data.total < len(link_tag):
            gen_log("Grabbing chapters and first comics")
            chapter_data = get_comic_chapters()
            # grab the latest chapter by checking the latest comic
            for comic in index_comic_data.docs:
                if int(comic.index) == index_comic_data.total:
                    chapter = comic.chapter
                    break

            index = len(link_tag)
            link = link_tag[-1].get("href") # grab the current comic from HP

            data = scrape_comic(link, year, index)

            for character in data["comic"]["characters"].split(","):
                characters_db.add(character)
            
            # grabs the link title from the keyname and check if that link title
            if data["key_name"].split(":")[1] in chapter_data.keys():
                chapter = chapter_data[data["key_name"].split(":")[1]]["ch_name"]
                print(chapter)

            RedisDB.hset(
                data["key_name"],
                # add in the chapter tag
                mapping=data["comic"] | {"chapter": chapter}
            )

            # put the character list and the list of chapters into redis
            RedisDB.lpush("characters_db", *characters_db)
            RedisDB.lpush("chapter_db", *chapter_data.keys())


with ThreadPoolExecutor(max_workers=50) as executor:
    executor.map(main, range(155))

if __name__ == "__main__":
    main()
