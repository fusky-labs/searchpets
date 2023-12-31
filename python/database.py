from redis import StrictRedis
from redis.exceptions import ResponseError
from redis.commands.search.query import Query
from redis.commands.search.indexDefinition import IndexDefinition
from constants import redis_url

class Database:
    def __init__(self):
        self._connection = StrictRedis().from_url(redis_url)
    
