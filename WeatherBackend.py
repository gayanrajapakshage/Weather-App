from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

# Create app
app = Flask(__name__)
CORS(app, resources={r"/current-weather": {"origins": ["http://localhost:3000", "https://github.com/gayanrajapakshage"]}})
CORS(app, resources={r"/weekly-forecast": {"origins": ["http://localhost:3000", "https://github.com/gayanrajapakshage"]}})
CORS(app, resources={r"/search-city": {"origins": ["http://localhost:3000", "https://github.com/gayanrajapakshage"]}})

# API key
WEATHER_API_KEY = "ae3e3e2375f74ca381d11445242904"  # Replace with your valid API key
WEATHER_API_URL = "http://api.weatherapi.com/v1"

# Define search city endpoint
@app.route("/search-city", methods=["GET"])
def search_city():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "Please provide a search query."}), 400
    
    # Request city search data
    response = requests.get(
        f"{WEATHER_API_URL}/search.json",
        params={"key": WEATHER_API_KEY, "q": query},
    )
    
    if response.status_code != 200:
        return jsonify({"error": "Could not get city data."}), response.status_code
    
    data = response.json()
    return jsonify(data)

# Define current weather endpoint
@app.route("/current-weather", methods=["GET"])
def current_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "Please provide a city name."}), 400
    
    # Request current weather data
    response = requests.get(
        f"{WEATHER_API_URL}/current.json",
        params={"key": WEATHER_API_KEY, "q": city, "aqi": "no"},
    )
    
    if response.status_code != 200:
        return jsonify({"error": "Could not get weather data."}), response.status_code
    
    data = response.json()
    return jsonify(data)

# Define weekly forecast endpoint
@app.route("/weekly-forecast", methods=["GET"])
def weekly_forecast():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "Please provide a city name."}), 400
    
    # Request weekly forecast data
    response = requests.get(
        f"{WEATHER_API_URL}/forecast.json",
        params={"key": WEATHER_API_KEY, "q": city, "days": 7},
    )
    
    if response.status_code != 200:
        return jsonify({"error": "Could not get forecast data."}), response.status_code
    
    data = response.json()
    return jsonify(data)

# Server Flask App
if __name__:
    app.run(host='0.0.0.0', port=5001, debug=True)  
