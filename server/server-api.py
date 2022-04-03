from flask import Flask, request, jsonify
import json

with open('housepets_db.json', 'r') as housepets_db_json:
    housepets_db = json.load(housepets_db_json)

app = Flask(__name__)

@app.route('/search', methods=['POST'])
def test():
    print(request.json)
    years = request.json['year']
    characters = request.json['characters']
    comics = []
    for year in years:
        for comic in housepets_db[year]:
            if all(character in comic['characters'] for character in characters):
                comics.append(comic)
    return jsonify({'comics': comics})

@app.route('/data', methods=['GET'])
def data():
    housepets_db_length = 0
    # send the data on how many comics are in the whole database
    for year in range(2008, 2022+1):
        housepets_db_length += len(housepets_db[str(year)])
    return jsonify({'housepets_db_length': housepets_db_length})

if __name__ == '__main__':
    app.run(debug=True)