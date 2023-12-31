from datetime import datetime
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField
from dotenv import load_dotenv
import os

# loads any environment variables that are gonna be used
load_dotenv()

initial_year: int = int(2008)
current_year: int = datetime.now().year

schema = (
    TextField("title"),
    TextField("comic_link"),
    TagField("characters"),
    TagField("chapter"),
    TextField("year"),
    TextField("date"),
    TextField("image"),
    NumericField("index", sortable=True),
)

char_schema = (
    TextField("name"),
    TextField("slug"),
    NumericField("amount"),
)

redis_url = os.getenv("REDIS_URL")