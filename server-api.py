from flask import Flask, request, jsonify
import json

with open('housepets_db.json', 'r') as housepets_db_json:
    housepets_db = json.load(housepets_db_json)

app = Flask(__name__)

@app.route('/test')
def test():
    return jsonify({'message': 'Hello people, this is just a test'})

if __name__ == '__main__':
    app.run(debug=True)