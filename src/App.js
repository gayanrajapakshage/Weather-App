import React, { useState } from 'react';
import axios from 'axios';
//import Select from 'react-select';

function App() {
  const [city, setCity] = useState(''); // State to hold the city input value
  const [weather, setWeather] = useState(null); // State to hold weather data
  const [error, setError] = useState(null); // State to hold error messages
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [searchCity, setSearchCity] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get('https://weather-app-ijxq.onrender.com/current-weather', {
        params: { city: city },
      });
      setWeather(response.data);
      setError(null);
  } catch (error) {
    setError("Sorry, we couldn't find that city. Please try again with a different city name.");
    setWeather(null);
  }
  };

  const getWeeklyForecast = async() => {
    try{
      const response = await axios.get('https://weather-app-ijxq.onrender.com/weekly-forecast', {
        params: { city: city },
      });
      console.log('Weekly forecast data:', response.data);
      setWeeklyForecast(response.data);
      setError(null);
    } catch(error){
      setWeeklyForecast(null);
    }
  };

  const getSearchCity = async() => {
    try{
      const response = await axios.get('https://weather-app-ijxq.onrender.com/search-city', {
        params: { query: city },
      });
      console.log('Search City data:', response.data);
      setSearchCity(response.data);
      setError(null);
    } catch(error){
      setSearchCity(null);
    }
  };

  const handleSearch = async () => {
    await getWeather();
    await getWeeklyForecast();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">THE WEATHER APP</h1>
        {/* Input and button to search for weather */}
        <div className="city-search-container">
          <input
            type="text"
            id="city-input"
            placeholder="Enter a city..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <span className="material-symbols-outlined" onClick={handleSearch}>
          search
          </span>
        </div>
        
        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}
        {/* Display weather data if available */}
        {weather && ( <h2 className="location">{weather.location.name}, {weather.location.region}, {weather.location.country}</h2>)}
        <div className="weather-card-container">
          {weather && (
              <div className="current-weather-card">
                <h2>Current</h2>
                <div className="current-temp">
                  <h3 id="current-temp-value">{Math.round(weather.current.temp_c)}</h3>
                  <h3 id="current-temp-celsius">°C</h3>
                </div>
                <p>{weather.current.condition.text}</p>
                <p>Feels Like: {Math.round(weather.current.feelslike_c)}°C</p>
                <p>Wind: {weather.current.wind_kph} km/h</p>
                <p>Humidity: {weather.current.humidity}%</p>
              </div>
          )}
          {weeklyForecast && (
            <div className="weekly-forecast-cards">
              <div className="day-one-weather">
                <h2>Tomorrow</h2>
                <div className="day-one-temp">
                  <h3 id="day-one-value">{Math.round(weeklyForecast.forecast.forecastday[1].day.avgtemp_c)}</h3>
                  <h3 id="day-one-celsius">°C</h3>
                </div>
                <p>{weeklyForecast.forecast.forecastday[1].day.condition.text}</p>
                <p>Precipitation: {weeklyForecast.forecast.forecastday[1].day.daily_chance_of_rain}%</p>
                <p>Max. Wind: {weeklyForecast.forecast.forecastday[1].day.maxwind_kph} km/h</p>
                <p>Humidity: {weeklyForecast.forecast.forecastday[1].day.avghumidity}%</p>
              </div>
              <div className="day-two-weather">
                <h2>Day After</h2>
                <div className="day-two-temp">
                  <h3 id="day-two-value">{Math.round(weeklyForecast.forecast.forecastday[2].day.avgtemp_c)}</h3>
                  <h3 id="day-two-celsius">°C</h3>
                </div>
                <p>{weeklyForecast.forecast.forecastday[2].day.condition.text}</p>
                <p>Precipitation: {weeklyForecast.forecast.forecastday[2].day.daily_chance_of_rain}%</p>
                <p>Max. Wind: {weeklyForecast.forecast.forecastday[2].day.maxwind_kph} km/h</p>
                <p>Humidity: {weeklyForecast.forecast.forecastday[2].day.avghumidity}%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;