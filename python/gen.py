from datetime import datetime
from redis.commands.search.indexDefinition import IndexDefinition
from funcs import Housepets, schema, RedisDB

hp = Housepets()
chapter_entries = hp.get_chapter_entries()

characters = set()
initial_year = 2008
current_year = datetime.now().year

for year in range(initial_year, current_year):
    index_def = IndexDefinition(prefix=[f"{year}:"],
                                score=0.5,
                                score_field="doc_score")

    try:
        RedisDB.ft(f"{year}").create_index(schema, definition=index_def)
    except Exception as e:
        print(f"{year} index already exists")

    print(year)
    comics = hp.get_comic_chrono(year)
    print(f"Going through {len(comics)}")

    for index, comic in enumerate(comics):
        comic_data = hp.get_comic_metadata(comic, index)

        comic_key = comic_data["key_name"]
        comic_characters = comic_data["characters"]
        print(f"{comic_key} : {comic_data['comic']['comic_link']}")

        comic_link_title = comic_key.split(":")[1]
        if comic_link_title in chapter_entries:
            current_chapter = chapter_entries[comic_link_title].lower()

        for character in comic_characters:
            characters.add(character)

        RedisDB.hset(
            comic_key,
            mapping=comic_data["comic"] | {"chapter": current_chapter}
        )

RedisDB.lpush("characters_db", *characters)
RedisDB.lpush("chapter_db", *chapter_entries.keys())
