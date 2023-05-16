import time
from redis.commands.search.indexDefinition import IndexDefinition
from redis.commands.search.query import Query
from funcs import Housepets, schema, RedisDB

hp = Housepets()
year = time.strftime("%Y")
latest_comics = hp.get_comic_chrono(year)
try:
    year_db = RedisDB.ft(year).search(Query("*").paging(0, 500))
except Exception:
    index_def = IndexDefinition(prefix=[f"{year}:"], score=0.5, score_field="doc_score")
    print("no such year index so were creatin one")
    RedisDB.ft(year).create_index(schema, index_def)
    quit()

if len(latest_comics) > year_db.total:
    print("adding comics to redis")
    characters = set(RedisDB.lrange("characters_db", 0, -1))
    comic = hp.get_comic_metadata(latest_comics[-1]["href"], index=year_db.total)
    RedisDB.hset(
        comic["key_name"],
        mapping=comic["comic"]
    )


