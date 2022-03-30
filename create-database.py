import requests
from bs4 import BeautifulSoup
import re
import json

years = ['2008', "2009", "2010", "2011", "2012", "2013", "2014", 
        "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]

housepets_official_comics_database = {}
print("Creating database...")
print("this may take a while...")
for year in years:

    housepets_official_comics_database.update({year: []})
    print(year)
    web = requests.get(f"https://www.housepetscomic.com/archive/?archive_year={year}")
    soup = BeautifulSoup(web.text, 'html.parser')
    link_tag = soup.find_all('a', {'rel':"bookmark", 'href': re.compile("^https://")})
    print(len(link_tag))
    for link in link_tag:
        web_link = link.get('href')
        web_link_page = requests.get(web_link)
        if "https://www.housepetscomic.com/character" in web_link_page.text:
            print(f'{web_link} is a real comic by rick grifin')

            # get the characters from the comic
            characters_in_comic = []
            characters_in_comic_soup = BeautifulSoup(web_link_page.text, 'html.parser')
            characters_in_comic_tag = characters_in_comic_soup.find_all('a', {'href': re.compile("^https://www.housepetscomic.com/character")})
            for character in characters_in_comic_tag:
                characters_in_comic.append(character.text)
            housepets_official_comics_database[year].append({'comic_link': web_link, 'characters': characters_in_comic})
        else:
            print(f'{web_link} is a guest comics')


# save the dictionary to a json file
print("saving to database...")
with open('housepets_official_comics_database.json', 'w') as housepets_official_comics_database_json:
    json.dump(housepets_official_comics_database, housepets_official_comics_database_json)
