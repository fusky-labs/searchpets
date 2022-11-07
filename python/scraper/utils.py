import requests
from colorama import Back, Fore, Style

base_url: str = "https://www.housepetscomic.com"
user_agent = {
    "user-agent": ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)"
                   "AppleWebKit/537.36 (KHTML, like Gecko)"
                   "Chrome/45.0.2454.101 Safari/537.36"),
    "referer": base_url,
}


rs = requests.session()


def fetch_url(url: str):
    return rs.get(url, headers=user_agent, timeout=None)


def gen_log(msg: str) -> str:
    colors = Back.YELLOW + Fore.LIGHTWHITE_EX + Style.BRIGHT
    return colors + msg + Style.RESET_ALL
