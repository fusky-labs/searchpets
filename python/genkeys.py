import argparse
import json

parser = argparse.ArgumentParser(
    description="A script to generate keys for the server")
parser.add_argument(
    "-pswd",
    "--password",
    help="The password to access the redis database",
    required=False,
)
parser.add_argument("-U",
                    "--username",
                    help="The username to the redis database",
                    required=True)
parser.add_argument("-H",
                    "--host",
                    help="The host of the redis database",
                    required=True)
parser.add_argument("-P",
                    "--port",
                    help="The port of the redis database",
                    required=True)

args = parser.parse_args()
host, port, username, password = args.host, args.port, args.username, args.password

if password is None:
    redis_url = f"redis://{username}@{host}:{port}"
else:
    redis_url = f"redis://{username}:{password}@{host}:{port}"

redis_config_json = {
    "database": {
        "password": password,
        "host": host,
        "port": port,
        "username": username
    }
}

with open("redis_config.json", "w") as f:
    json.dump(redis_config_json, f)


with open("../../apps/website/.env.local", "a+") as f:
    if not "REDIS_URL" in f.read():
        f.write(f"\nREDIS_URL={redis_url}")
