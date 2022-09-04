import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor

import redis
import requests
from bs4 import BeautifulSoup
from colorama import *

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream

# rs = requests.Session()


def main():
    # global rs

    housepets_db = {}
    print(
        f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} Generating Housepets database... {Style.RESET_ALL}"
    )

    while True:
        time.sleep(5)
        year = time.strftime("%Y")
        characters = RedisDB.lrange("characters_db", 0, -1)
        characters = [character for character in characters]
        characters_db = set(characters)

        print("characters_db length:", len(characters_db))

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

            """
            !!!
            !!! Scraper part refactor in progress
            !!! Can be found on scraper.py/gen.py
            !!!
            """

            RedisDB.delete("characters_db")
            RedisDB.lpush("characters_db", *characters_db)


with ThreadPoolExecutor(max_workers=55) as executor:
    executor.map(main, range(155))

if __name__ == "__main__":
    main()
