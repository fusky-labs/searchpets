from datetime import datetime


class Housepets:
    def __init__(self):
        ...
        # base_url
        # chapter_url

    def _req(self, url: str) -> BeautifulSoup:
        # request url and return a bs4 element from the response html
        ...

    def get_chapter_entries(self):
        # grab the link and chapter name from dropdown
        #
        # create the dictionary to implement the chapter assignment
        chapter_entry_points = dict()
        #
        # for chapter in chapter_dropdown:
        #    first_comic = grab first comic of chapter using bs4 and _req()
        #
        #    chapter_entry_points.update({first_comic.title:chapter.name})
        #
        return chapter_entry_points

    def get_latest_chapter(self):
        # grab the latest comic from the chapter dropdown

        return chapter_name

    def get_comic_chrono(self, year: int | str):
        """
        return a list of bs4 elements of a comics from a year
        """
        # request bs4 page of the year archive page and return
        # every element containing the comic link
        ...

    def get_comic_metadata(self, target: bs4_element):
        # do some beautifulsoup stuff here then output:
        # output = {
        #    title: title,
        #    characters: characters[],
        #    link: <url>,
        #    rick?
        # }

        return output
        ...

    def dump_to_redis():
        # get credientials

        # if !credientials:
        #    throw error
        #   return
        ...


hp = Housepets()


def generator():
    chapter_entries = hp.get_chapter_entries()
    current_chapter: str = ""

    initial_year = 2008
    current_year = datetime.now().year
    
    for year in range(initial_year, current_year+1):
        print(year)
        comics = hp.get_comic_chrono(year)
        
        for comic in comics:
            print(comic)
            

def updater():
    ...
