from flask import Flask, render_template, request, jsonify # type: ignore
from rules import filter_restaurants

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/recommend', methods=['POST'])
def recommend():
    user_prefs = request.json
    results = filter_restaurants(user_prefs)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
