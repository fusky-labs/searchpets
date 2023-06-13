from housepets import Housepets, housepets_db
from constants import current_year, initial_year, schema, char_schema


def main():
    hp = Housepets()

    hp.create_index("characters", char_schema)
    hp.create_index("chapters", char_schema)
    hp.create_index("comics", schema)
    comic_index = 1

    chapter_entries = hp.get_chapter_entries()

    # set the max search result to a max of 10000 results
    housepets_db.ft().config_set('MAXSEARCHRESULTS', '-1')

    for year in range(initial_year, current_year+1):
        print(year)

        comics = hp.get_comic_chrono(year)
        print(f"Going through {len(comics)}")

        for comic in comics:
            comic_data = hp.get_comic_metadata(comic, comic_index)
            comic_index += 1

            comic_key = comic_data["key_name"]
            comic_characters = comic_data["characters"]

            print(f"{comic_key} : {comic_data['comic']['comic_link']}")

            comic_link_title = comic_key.split(":")[1]
            if comic_link_title in chapter_entries:
                current_chapter = chapter_entries[comic_link_title]

            if comic_characters:
                hp.set_char_slugs("characters", comic_characters)
            hp.set_char_slugs("chapters", [current_chapter])

            housepets_db.hset(
                comic_key,
                mapping=comic_data["comic"] | {"chapter": current_chapter, "year": year}
            )


if __name__ == "__main__":
    main()
