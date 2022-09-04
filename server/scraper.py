from redis.commands.search.field import NumericField, TagField, TextField
from redis.commands.search.indexDefinition import IndexDefinition
from redis.commands.search.query import Query

housepets_db = {}

user_agent = {
    "user-agent": ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)"
                   "AppleWebKit/537.36 (KHTML, like Gecko)"
                   "Chrome/45.0.2454.101 Safari/537.36"),
    "referer":
        "https://www.housepetscomic.com",
}


rs = requests.Session()


def connect_redis():
    with open("./redis_config.json") as f:
        redis_config = json.load(f)

    print("Connecting to redis...")
    if redis_config["database"]["password"] is None:
        RedisDB = redis.StrictRedis(
            host=redis_config["database"]["host"],
            port=int(redis_config["database"]["port"]),
            username=redis_config["database"]["username"],
        )
    else:
        RedisDB = redis.StrictRedis(
            host=redis_config["database"]["host"],
            port=int(redis_config["database"]["port"]),
            username=redis_config["database"]["username"],
            password=redis_config["database"]["password"],
        )

    schema = (
        TextField("title"),
        TextField("comic_link"),
        TagField("characters"),
        TextField("image"),
        NumericField("index", sortable=True),
    )


def hp_scraper():
    global user_agent
    global housepets_db
    global rs

    index_def = IndexDefinition(prefix=[f"{year}:"],
                                score=0.5,
                                score_field="doc_score")

    try:
        print(
            f"{Back.YELLOW}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} Setting up {year} index... {Style.RESET_ALL}"
        )
        RedisDB.ft(f"{year}").create_index(schema,
                                           definition=index_def)
    except Exception as e:
        print(
            f"{Back.RED}{Fore.LIGHTWHITE_EX}{Style.BRIGHT} {year} index already exists {Style.RESET_ALL}"
        )

        print(
            f"Searching in year {Fore.GREEN}{Style.BRIGHT}{year}{Style.RESET_ALL}"
        )

    web = rs.get(
        f"https://www.housepetscomic.com/archive/?archive_year={year}",
        headers=user_agent,
        timeout=None,
    )
    soup = BeautifulSoup(web.text, "html.parser")
    link_tag = soup.find_all("a", {
        "rel": "bookmark",
        "href": re.compile("^https://")
    })
    print(
        f"Found {Fore.GREEN}{Style.BRIGHT}{len(link_tag)}{Style.RESET_ALL} tags!"
    )

    for index, link in enumerate(link_tag, start=1):
        link = link.get("href")
        link_page = rs.get(link, headers=user_agent, timeout=None)
        if "https://www.housepetscomic.com/character" in link_page.text:
            print(link)

            characters = []
            comic_soup = BeautifulSoup(link_page.text, "html.parser")
            characters_tag = comic_soup.find_all(
                "a",
                {
                    "href":
                    re.compile(
                        "^https://www\.housepetscomic\.com/character")
                },
            )
            for character in characters_tag:
                characters.append(character.text.lower())
                characters_db.add(character.text.lower())

            comic_image = comic_soup.find("img", {
                "title": True,
                "alt": True
            })

            print(comic_image.get("src"))
            link_title = link.split("/")[-2]

            print(link_title)
            RedisDB.hset(
                f"{year}:{link_title}",
                mapping={
                    "title":
                    comic_soup.title.text.split(" \u2013 ")[0],
                    "comic_link": link,
                    "characters": ",".join(characters),
                    "image": comic_image.get("src"),
                    "index": index,
                },
            )
        else:
            print(
                f"{Fore.BLACK}{Back.LIGHTWHITE_EX}{Style.BRIGHT}{link} is a guest comics{Style.RESET_ALL}"
            )
