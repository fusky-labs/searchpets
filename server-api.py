from flask import Flask, request, jsonify
import json

with open('housepets_db.json', 'r') as housepets_db_json:
    housepets_db = json.load(housepets_db_json)

app = Flask(__name__)

@app.route('/search', methods=['POST'])
def test():
    print(request.json)
    year = request.json['year']
    characters = request.json['characters']
    comics = []
    for comic in housepets_db[year]:
        if all(character in comic['characters'] for character in characters):
            comics.append(comic)
    return jsonify({'comics': comics})

if __name__ == '__main__':
    app.run(debug=True)