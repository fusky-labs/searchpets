from housepets import Housepets, RedisDB
from constants import current_year, initial_year


def main():
    hp = Housepets()
    chapter_entries = hp.get_chapter_entries()

    for year in range(initial_year, current_year+1):
        hp.create_index(year)
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

            if comic_characters: RedisDB.sadd("characters_db", *comic_characters)

            RedisDB.hset(
                comic_key,
                mapping=comic_data["comic"] | {"chapter": current_chapter}
            )
        RedisDB.sadd("chapter_db", *chapter_entries.values())

if __name__ == "__main__":
    main()
