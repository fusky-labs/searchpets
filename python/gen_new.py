from database import Database
from datetime import datetime
from bs4 import BeautifulSoup
from typing import Any
import json
import re
import requests
import os

_console = os.get_terminal_size()

HP_BASE_URL = "https://www.housepetscomic.com"
HP_WIKI_URL = "https://housepetscomic.fandom.com"


def strip_url(url: list) -> list:
    split_slashes = url.split('/')
    filter_empties = list(filter(None, split_slashes))

    return filter_empties


def request_page(url: str):
    rs = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Referer': url,
        'Connection': 'keep-alive'
    }

    req = rs.get(url, headers=headers)
    return BeautifulSoup(req.text, "html.parser")


def map_selectors(page: BeautifulSoup, selectors: list[str]):
    return [page.select_one(selector) for selector in list(selectors)]


def load_json(file: str):
    with open(file, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(data: Any, fn: str, indent: bool = False):
    with open(fn, "w+", encoding="utf-8") as f:
        if indent:
            json.dump(data, f, indent=2)
        else:
            json.dump(data, f)


def main():
    print("scraper started *wowzas*")
    initial_page = request_page(HP_BASE_URL)
    chapter_dropdown = initial_page.select('option.level-0')

    # Parse all found chapters and condense them in a nice package
    # so it'll be modular and easy to read instead of nesting it in for-loops
    chapter_data: list[dict[str, str]] = []

    # Check if cache file is available, otherwise make one you dingus
    cache_filename = ".chapter-cache"

    try:
        cached_chapters = load_json(cache_filename)
        chapter_data = cached_chapters
        print("Chapter cache hit, proceeding to iterate items")

    except FileNotFoundError:
        print("Chapter cache miss, generating a new one")

        def append_chapter_data(name: str, url: str):
            slug = strip_url(url)[-1]

            chapter_data.append({
                "name": name,
                "url": url,
                "slug": slug
            })

        for chapter_option in chapter_dropdown:
            _ch_name, _ch_url = chapter_option.text, chapter_option.get(
                'value')
            _strip_pattern = r"(^-\d\d\.\s)|(^\d\d\d\.\s)"

            is_contain_nums = re.search(_strip_pattern, _ch_name)

            if is_contain_nums:
                append_chapter_data(re.sub(_strip_pattern, '', _ch_name), _ch_url)  # NOQA
            else:
                append_chapter_data(_ch_name, _ch_url)

        print("Generated chapter cache baby")
        save_json(chapter_data, cache_filename)

    comic_data = []
    character_sets = set()

    def iterate_comic_items(page: BeautifulSoup, chapters: tuple[str]):
        _ch_url, _ch_name, _ch_slug = chapters

        comic_items = page.select('.mh-loop-thumb-link')
        _comic_links = list(map(lambda item: item.get('href'), comic_items))  # NOQA

        for comic_link in _comic_links:
            comic_page = request_page(comic_link)

            comic_title, comic_date, comic_img = map_selectors(
                comic_page, ['.entry-title', '.entry-meta-date a', '#comic img']  # NOQA
            )

            comic_title = comic_title.text
            comic_date = datetime.strptime(comic_date.text, "%B %d, %Y").isoformat()  # NOQA
            comic_image, comic_image_alt = comic_img.get('src'), comic_img.get('alt')  # NOQA

            _tags = comic_page.select('.entry-tags a')
            _chars = []

            for char in _tags:
                char_url = char.get('href')
                char_slug = strip_url(char_url)[-1]

                comic_chars = {
                    'name': char.text,
                    'slug': char_slug,
                    'og_url': char_url
                }

                # Since sets only accept anything but dicts, we convert to string
                # then to dict afterwards
                character_sets.add(json.dumps(comic_chars))
                _chars.append(comic_chars)

            data_output = {
                'title': comic_title,
                'date': comic_date,
                'og_url': comic_link,
                'image': comic_image,
                'image_alt': comic_image_alt,
                'characters': _chars,
                'chapter': {
                    'name': _ch_name,
                    'slug': _ch_slug,
                    'og_url': _ch_url
                }
            }

            comic_data.append(data_output)

            iter_status = ' In chapter: "{}", retrieved "{}"'.format(_ch_name, comic_title)  # NOQA

            print(iter_status.ljust(_console.columns), end='\r', flush=True)

    for index, chapter in enumerate(chapter_data):
        chapter_vals = chapter.values()
        chapter_name, chapter_url, chapter_slug = chapter_vals

        chapter_page = request_page(chapter_url)
        pagination_items = chapter_page.select('.mh-loop-pagination .page-numbers')  # NOQA

        if not len(pagination_items) == 0:
            # Because we can't find out if there are more paginated pages are there,
            # we only get the second-to-last element to determine the total number of
            # paginated pages
            total_pagd_url = pagination_items[-2].get('href')
            total_pagd = strip_url(total_pagd_url)[-1]

            for current_page in range(1, int(total_pagd) + 1):
                _parsed_url = f"{HP_BASE_URL}/chapter/{chapter_slug}/page/{current_page}/"

                comic_list = request_page(_parsed_url)

                iterate_comic_items(page=comic_list, chapters=tuple(chapter_vals))  # NOQA
        else:
            iterate_comic_items(page=chapter_page, chapters=tuple(chapter_vals))  # NOQA

        save_json({'data': comic_data}, "comics.json")


if __name__ == "__main__":
    main()
