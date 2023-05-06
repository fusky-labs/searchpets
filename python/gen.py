import time
from redis.commands.search.indexDefinition import IndexDefinition
from funcs import Housepets, schema, RedisDB

hp = Housepets()

chapter_comics = hp.get_chapters_comic()
characters = set()
current_year = int(time.strftime("%Y"))+1

for year in range(2008, current_year):
    index_def = IndexDefinition(prefix=[f"{year}:"],
                                score=0.5,
                                score_field="doc_score")

    try: RedisDB.ft(f"{year}").create_index(schema, definition=index_def)
    except Exception as e: print(f"{year} index already exists")

    print(year)
    comics = hp.get_comics(year)
    print(f"Going trough {len(comics)}")
    for index, comic in enumerate(comics):
        comic_data = hp.get_comic(comic, index)
        comic_key = comic_data["key_name"]
        comic_characters = comic_data["characters"]
        print(f"{comic_key} : {comic_data['comic']['comic_link']}")

        comic_link_title = comic_key.split(":")[1]
        if comic_link_title in chapter_comics:
            current_chapter = chapter_comics[comic_link_title].lower()

        for character in comic_characters: characters.add(character)

        RedisDB.hset(
            comic_data["key_name"],
            mapping=comic_data["comic"] | {"chapter":current_chapter}
        )

RedisDB.lpush("characters_db", *characters)
RedisDB.lpush("chapter_db", *chapter_comics.keys())