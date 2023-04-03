from typing import Literal
import argparse
import requests
from bs4 import BeautifulSoup


BASE_URL = "https://housepetscomic.com"

rs = requests.Session()


class HousepetsParser:
    def get_page(self, url: str) -> BeautifulSoup:
        req = rs.get(url)
        return BeautifulSoup(req.text, "html.parser")


class Babylon(HousepetsParser):
    def __init__(self) -> None:
        pass

    def update(self) -> None:
        pass

    def scrape(self) -> None:
        pass


hp = Babylon()


def main():
    parser = argparse.ArgumentParser(description="Help me")

    parser.add_argument('--redis', description="Redis key",
                        action="store_true")
    parser.add_argument(
        '-u', '--update', description="Update to the latest comic", action="store_true")
    parser.add_argument(
        '-s', '--scrape', description="Get HP data", action="store_true")

    parser.parse_args()

    if (parser.update):
        print("updating database")
        hp.update()
        return

    if (parser.scrape):
        print("getting database")
        hp.scrape()
        return


if __name__ == "__main__":
    main()
