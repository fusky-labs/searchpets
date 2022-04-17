from flask import Flask, request, jsonify
import json
import os
import threading
import time
import requests as req
from bs4 import BeautifulSoup
import re

with open('housepets_db.json', 'r') as housepets_db_json:
    housepets_db = json.load(housepets_db_json)

def update_database():
    while True:
        time.sleep(600)
        year = time.strftime("%Y")
        web = req.get(f"https://www.housepetscomic.com/archive/?archive_year={year}")
        soup = BeautifulSoup(web.text, 'html.parser')
        link_tag = soup.find_all('a', {'rel':"bookmark", 'href': re.compile("^https://")})
        if len(link_tag) > len(housepets_db[year]):
            print("[*]updating database")
            for link in link_tag:
                web_link = link.get('href')
                web_link_page = req.get(web_link)
                if "https://www.housepetscomic.com/character" in web_link_page.text:
                    print(f'{web_link} is a real comic by rick grifin')

                    characters_in_comic = []
                    characters_in_comic_soup = BeautifulSoup(web_link_page.text, 'html.parser')
                    characters_in_comic_tag = characters_in_comic_soup.find_all('a', {'href': re.compile("^https://www\.housepetscomic\.com/character")})
                    for character in characters_in_comic_tag:
                        characters_in_comic.append(character.text)
                    comic_image = characters_in_comic_soup.find('img', {'title': True, 'alt': True})
                    housepets_db[year].append({"title": characters_in_comic_soup.title.text.split(' \u2013 ')[0],
                                            "comic_link": web_link,
                                            "characters": characters_in_comic,
                                            "image": comic_image.get('src')})
            print(housepets_db)
            with open('housepets_db.json', 'w') as housepets_db_json:
                json.dump(housepets_db, housepets_db_json)
        else:
            print("* database is up to date")
    
threading.Thread(target=update_database).start()

app = Flask(__name__)

@app.route('/search', methods=['POST'])
def test():
    print(request.json)
    years = request.json['year']
    characters = request.json['characters']
    comics = []
    for year in years:
        for comic in housepets_db[year]:
            if all(character in comic['characters'] for character in characters):
                comics.append(comic)
    return jsonify({'comics': comics})

@app.route('/data', methods=['GET'])
def data():
    housepets_db_length = 0
    for year in range(2008, 2022+1):
        housepets_db_length += len(housepets_db[str(year)])
    return jsonify({'housepets_db_length': housepets_db_length})

if __name__ == '__main__':
    app.run()