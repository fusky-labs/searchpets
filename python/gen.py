from housepets import Housepets, housepets_db
from constants import current_year, initial_year, schema, char_schema
import argparse


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-uc", "--usecache", action="store_true")
    args = parser.parse_args()

    hp = Housepets(args.usecache)

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

            comic_key = comic_data.get("key_name")
            comic_characters = comic_data.get("characters")

            print(f"{comic_key} : {comic_data['comic']['comic_link']}")

            comic_link_title = comic_data['comic']['comic_link']
            current_chapter = chapter_entries.get(comic_link_title, "Ricks posts")

            if comic_characters:
                hp.set_char_slugs("characters", comic_characters)
            hp.set_char_slugs("chapters", [current_chapter])

            comic_data.get("comic").update({"chapter": current_chapter, "year": year})
            hp.set_comic(comic_data)


if __name__ == "__main__":
    main()