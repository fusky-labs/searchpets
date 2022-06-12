import json
import threading
import time
import requests as req
from bs4 import BeautifulSoup
import re
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

class Search(BaseModel):
    characters: list = []
    year: list = []


with open('housepets_db.json', 'r') as housepets_db_json:
    housepets_db = json.load(housepets_db_json)

def update_database():
    while True:
        time.sleep(600)
        characters_db = set(housepets_db['characters_db'])
        year = time.strftime("%Y")
        web = req.get(f"https://www.housepetscomic.com/archive/?archive_year={year}")
        soup = BeautifulSoup(web.text, 'html.parser')
        link_tag = soup.find_all('a', {'rel':"bookmark", 'href': re.compile("^https://")})

        comics_db = []

        if len(link_tag) > len(housepets_db[year]):
            print("[*] Updating database...")
            for link in link_tag:
                web_link = link.get('href')
                web_link_page = req.get(web_link)
                if "https://www.housepetscomic.com/character" in web_link_page.text:
                    print(f'{web_link} is a real comic by rick grifin')

                    characters_in_comic = []
                    characters_in_comic_soup = BeautifulSoup(web_link_page.text, 'html.parser')
                    characters_in_comic_tag = characters_in_comic_soup.find_all('a', {'href': re.compile("^https://www\.housepetscomic\.com/character")})
                    for character in characters_in_comic_tag:
                        characters_in_comic.append(character.text.lower())
                    # the code under this will find the image where there is a tittle and alt
                    comic_image = characters_in_comic_soup.find('img', {'title': True, 'alt': True})
                    comics_db.append({"title": characters_in_comic_soup.title.text.split(' \u2013 ')[0],
                                            "comic_link": web_link,
                                            "characters": characters_in_comic,
                                            "image": comic_image.get('src')})
                    characters_db.update(characters_in_comic)
            housepets_db['characters_db'] = list(characters_db) # update the characters db
            housepets_db[year] = comics_db # update the comics db
            with open('housepets_db.json', 'w') as housepets_db_json:
                json.dump(housepets_db, housepets_db_json)
            print("[*] Database updated!")

        else:
            print("[*] Database is currently up to date!")

threading.Thread(target=update_database).start()

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
    print("[*] Starting server...")
    print("[*] Server running on port 5000.")
    uvicorn.run(app, host="0.0.0.0", port=5000)
