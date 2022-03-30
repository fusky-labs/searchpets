from flask import Flask, request, jsonify
import json

with open('housepets_official_comics_database.json', 'r') as housepets_official_comics_database_json:
    housepets_official_comics_database = json.load(housepets_official_comics_database_json)

app = Flask(__name__)

@app.route('/test')
def test():
    return jsonify({'message': 'Hello people, this is just a test'})

if __name__ == '__main__':
    app.run(debug=True)