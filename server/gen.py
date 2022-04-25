from bs4 import BeautifulSoup
from colorama import *
import os
import sys
import requests
import re
import json

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream

user_agent = {'user-agent': ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)'
                             'AppleWebKit/537.36 (KHTML, like Gecko)'
                             'Chrome/45.0.2454.101 Safari/537.36'),
                             'referer': 'https://www.housepetscomic.com'}

years = ['2008', "2009", "2010", "2011", "2012", "2013", "2014", 
        "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]

housepets_db = {}
print(f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} Generating Housepets database... {Style.RESET_ALL}")

characters_db = set()
for year in years:
    housepets_db.update({year: []})
    print(f"Searching in year {Fore.GREEN}{Style.BRIGHT}{year}{Style.RESET_ALL}")
    
    web = requests.get(f"https://www.housepetscomic.com/archive/?archive_year={year}", headers=user_agent, timeout=None)
    soup = BeautifulSoup(web.text, 'html.parser')
    link_tag = soup.find_all('a', {'rel':"bookmark", 'href': re.compile("^https://")})
    print(f"Found {Fore.GREEN}{Style.BRIGHT}{len(link_tag)}{Style.RESET_ALL} tags!")
    
    for link in link_tag:
        web_link = link.get('href')
        web_link_page = requests.get(web_link, headers=user_agent, timeout=None)
        if "https://www.housepetscomic.com/character" in web_link_page.text:
            print(web_link)

            characters = []
            comic_soup = BeautifulSoup(web_link_page.text, 'html.parser')
            characters_tag = comic_soup.find_all('a', {'href': re.compile("^https://www\.housepetscomic\.com/character")})
            for character in characters_tag:
                characters.append(character.text.lower())
                characters_db.add(character.text.lower())
            
            comic_image = comic_soup.find('img', {'title': True, 'alt': True})

            print(comic_image.get('src'))
            housepets_db[year].append({
                'title':comic_soup.title.text.split(' \u2013 ')[0], # The character "u\u2013" is the unicode for the dash
                'comic_link': web_link, 
                'characters': characters,
                'image': comic_image.get('src')
                }) 
        else:
            print(f'{Fore.BLACK}{Back.LIGHTWHITE_EX}{Style.BRIGHT}{web_link} is a guest comics{Style.RESET_ALL}')

housepets_db['characters_db'] = list(characters_db)
print("Saving to database...")

with open('housepets_db.json', 'w') as housepets_db_json:
    json.dump(housepets_db, housepets_db_json)
