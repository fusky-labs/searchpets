from bs4 import BeautifulSoup
from fastapi import FastAPI
from pydantic import BaseModel
import argparse
import json
import threading
import time
import requests as req
import re
import uvicorn

parser = argparse.ArgumentParser(description="Searchpets FastAPI Server")
parser.add_argument('-b', '--build', action="store_true",
                    help="Run the server in production mode, for development, don't provide with any arguments and run the file as is.")
args = parser.parse_args()


with open('housepets_db.json', 'r') as housepets_db_json:
    housepets_db = json.load(housepets_db_json)

"""
Update database
"""


def update_database():
    while True:
        time.sleep(600)
        characters_db = set(housepets_db['characters_db'])
        year = time.strftime("%Y")
        web = req.get(
            f"https://www.housepetscomic.com/archive/?archive_year={year}")
        soup = BeautifulSoup(web.text, 'html.parser')
        link_tag = soup.find_all(
            'a', {'rel': "bookmark", 'href': re.compile("^https://")})

        comics_db = []

        if len(link_tag) > len(housepets_db[year]):
            print("[*] Updating database...")
            for link in link_tag:
                web_link = link.get('href')
                web_link_page = req.get(web_link)
                if "https://www.housepetscomic.com/character" in web_link_page.text:
                    print(f'{web_link} is a real comic by rick grifin')

                    chars = []
                    chars_soup = BeautifulSoup(
                        web_link_page.text, 'html.parser')
                    chars_tag = chars_soup.find_all(
                        'a', {'href': re.compile("^https://www\.housepetscomic\.com/character")})
                    for character in chars_tag:
                        chars.append(character.text.lower())
                    # the code under this will find the image where there is a tittle and alt
                    comic_image = chars_soup.find(
                        'img', {'title': True, 'alt': True})
                    comics_db.append({"title": chars_soup.title.text.split(' \u2013 ')[0],
                                      "comic_link": web_link,
                                      "characters": chars,
                                      "image": comic_image.get('src')})
                    characters_db.update(chars)
            housepets_db['characters_db'] = list(
                characters_db)  # update the characters db
            housepets_db[year] = comics_db  # update the comics db
            with open('housepets_db.json', 'w') as housepets_db_json:
                json.dump(housepets_db, housepets_db_json)
            print("[*] Database updated!")

        else:
            print("[*] Database is currently up to date!")


threading.Thread(target=update_database).start()


class Search(BaseModel):
    characters: list = []
    year: list = []


app = FastAPI()


@app.post('/search')
async def search(search: Search):
    characters = search.characters
    years = search.year
    print(characters)
    print(years)
    comics = []
    for year in years:
        for comic in housepets_db[year]:
            if all(character in comic['characters'] for character in characters):
                comics.append(comic)
    return {'comics': comics}


@app.get('/data')
async def data():
    comic_length = 0
    for year in range(2008, 2022+1):
        comic_length += len(housepets_db[str(year)])
    chars_length = len(housepets_db['characters_db'])
    return {'comicCount': comic_length, 'charCount': chars_length}


@app.get('/characters')
async def characters():
    return {'characters_db': housepets_db['characters_db']}

if __name__ == '__main__':
    if args.build:
        print("[*] Server started in build/production mode")
        print("[*] Server running on port 5000.")
        uvicorn.run("app:app", host="192.168.0.1", port=5000)

    else:
        print("[*] Server started in development mode")
        uvicorn.run("app:app", host="192.168.0.1",
                    port=5000, reload=True, debug=True)
