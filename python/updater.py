from housepets import Housepets, RedisDB
from constants import current_year

hp = Housepets()

def main():
    latest_comics = hp.get_comic_chrono(current_year)

    year_db = hp.get_year_index(current_year)
    if year_db is None:
        hp.create_index(current_year)
        return

    if len(latest_comics) > year_db.total:
        print("adding comics to redis")

        latest_chapter = hp.get_latest_chapter()
        comic = hp.get_comic_metadata(latest_comics[-1], index=year_db.total)
        
        RedisDB.hset(
            comic["key_name"],
            mapping=comic["comic"] | {"chapter": latest_chapter}
        )

        RedisDB.sadd("characters_db", *comic["comic"]["characters"])
        RedisDB.sadd("chapter_db", latest_chapter)


if __name__ == "__main__":
    main()
