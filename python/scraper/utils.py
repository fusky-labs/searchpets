import requests
from colorama import Back, Fore, Style
import json
import redis

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

def connect_redis(filepath: str):
    print("Connecting to redis...")
    try:
        with open(filepath, "r") as f:
            config = json.load(f)
    
        cfg_host: str = config["database"]["host"]
        cfg_port: int = int(config["database"]["port"])
        cfg_username: str = config["database"]["username"]
        cfg_password: str = config["database"]["password"]

        if cfg_password is None:
            cfg_password = ''

        RedisDB = redis.StrictRedis(
            host=cfg_host,
            port=cfg_port,
            username=cfg_username,
            password=cfg_password,
            decode_responses=True
        )
    # i'm gonna go take a tea break, brb kuro :3
    # k lol
    except FileNotFoundError:
        print("file not found")
    return RedisDB