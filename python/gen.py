import requests
import time
import redis
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from redis.commands.search.indexDefinition import IndexDefinition
from bs4 import BeautifulSoup
from funcs import Housepets

HP_scraper = Housepets()

chapter_comics = HP_scraper.get_chapters_comic()

for year in range(2008, int(time.strftime("%Y"))+1):
    print(year)
    comics = HP_scraper.get_comics(year)
    print(f"Going trough {len(comics)}")
    for index, comic in enumerate(comics):
        comic_data = HP_scraper.get_comic(comic, index)
        print(f"{comic_data['key_name']} : {comic_data['comic']['comic_link']}")

