from datetime import datetime
from redis.commands.search.field import NumericField
from redis.commands.search.field import TagField
from redis.commands.search.field import TextField

initial_year: int = 2008
current_year: int = datetime.now().year

schema = (
    TextField("title"),
    TextField("comic_link"),
    TagField("characters"),
    TagField("chapter"),
    TextField("image"),
    NumericField("index", sortable=True),
)
