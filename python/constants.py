from datetime import datetime
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField

initial_year: int = int(2008)
current_year: int = datetime.now().year

schema = (
    TextField("title"),
    TextField("comic_link"),
    TagField("characters"),
    TextField("chapter"),
    TextField("date"),
    TextField("image"),
    NumericField("index", sortable=True),
)
