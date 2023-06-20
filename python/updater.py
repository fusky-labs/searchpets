from housepets import Housepets, housepets_db
from constants import current_year

hp = Housepets()


def main():
    latest_comics = hp.get_comic_chrono(current_year)

    # grabs the slugs for the 2 last comics from housepets
    two_latest_comics = [comics["href"].split("/")[-2] for comics in latest_comics[-2:]]

    if housepets_db.exists(f"comics:{two_latest_comics[1]}"):
        print("no new updates")
        return

    print("adding new comic to redis")

    latest_chapter = hp.get_latest_chapter()
    latest_index = int(housepets_db.hget(f"comics:{two_latest_comics[0]}", "index")) + 1

    comic = hp.get_comic_metadata(latest_comics[-1], index=latest_index)
    comic.get("comic").update({"chapter": latest_chapter, "year": current_year})

    hp.set_comic(comic)

    hp.set_char_slugs("characters", comic["comic"]["characters"])
    hp.set_char_slugs("chapters", [latest_chapter])


if __name__ == "__main__":
    main()
