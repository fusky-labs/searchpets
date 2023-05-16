import json
import argparse

parser = argparse.ArgumentParser(
    description="A script to generate keys for the server")

parser.add_argument("-pswd",
                    "--password",
                    help="The password to access the redis database",
                    required=False,
                    default=None)
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

with open("redis_config.json", "w") as f:
    json.dump({
        "username": args.username,
        "password": args.password,
        "host": args.host,
        "port": args.port
    }, f)
