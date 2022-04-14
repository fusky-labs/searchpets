import requests
from bs4 import BeautifulSoup
import re
import json

years = ['2008', "2009", "2010", "2011", "2012", "2013", "2014", 
        "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]

housepets_db = {}
print("Creating database...")
print("This may take a while...")

for year in years:
    housepets_db.update({year: []})
    print(year)
    web = requests.get(f"https://www.housepetscomic.com/archive/?archive_year={year}")
    soup = BeautifulSoup(web.text, 'html.parser')
    link_tag = soup.find_all('a', {'rel':"bookmark", 'href': re.compile("^https://")})
    print(len(link_tag))
    for link in link_tag:
        web_link = link.get('href')
        web_link_page = requests.get(web_link)
        if "https://www.housepetscomic.com/character" in web_link_page.text:
            print(web_link)

            # get the characters from the comic
            characters = []
            comic_soup = BeautifulSoup(web_link_page.text, 'html.parser')
            characters_tag = comic_soup.find_all('a', {'href': re.compile("^https://www.housepetscomic.com/character")})
            for character in characters_tag:
                characters.append(character.text.lower())
            
            # grab the only image with a title and an alt since the comic image is the only one with a title and alt
            comic_image = comic_soup.find('img', {'title': True, 'alt': True})

            print(comic_image.get('src'))
            housepets_db[year].append({
                'title':comic_soup.title.text.split(' \u2013 ')[0], # the u\u2013 is the unicode for the dash
                'comic_link': web_link, 
                'characters': characters,
                'image': comic_image.get('src')
                }) 
        else:
            print(f'{web_link} is a guest comics')


# save the dictionary to a json file
print("saving to database...")
with open('housepets_db.json', 'w') as housepets_db_json:
    json.dump(housepets_db, housepets_db_json)
