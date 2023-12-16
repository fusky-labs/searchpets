from housepets import Housepets, housepets_db
from constants import current_year, initial_year, schema, char_schema
import json

hp = Housepets()

chapter_entries = hp.get_chapter_entries()

print(len(chapter_entries))

with open("chapters.json", "w") as f:
    json.dump(chapter_entries, f, indent=2)