import React, { useState } from 'react';
import axios from 'axios';
//import Select from 'react-select';

function App() {
  const [city, setCity] = useState(''); // State to hold the city input value
  const [weather, setWeather] = useState(null); // State to hold current weather data
  const [weeklyForecast, setWeeklyForecast] = useState(null); // State to hold weekly weather data
  const [error, setError] = useState(null); // State to hold error messages
  //const [searchCity, setSearchCity] = useState(null);

  // Function to fetch current weather data for the entered city
  const getWeather = async () => {
    try {
      const response = await axios.get('https://weather-app-xv4x.onrender.com/current-weather', {
        params: { city: city },
      });
      setWeather(response.data);
      setError(null);
  } catch (error) {
    setError("Sorry, we couldn't find that city. Please try again with a different city name.");
    setWeather(null);
  }
  };

  // Function to fetch weekly forecast data for the entered city
  const getWeeklyForecast = async() => {
    try{
      const response = await axios.get('https://weather-app-xv4x.onrender.com/weekly-forecast', {
        params: { city: city },
      });
      console.log('Weekly forecast data:', response.data);
      setWeeklyForecast(response.data);
      setError(null);
    } catch(error){
      setWeeklyForecast(null);
    }
  };

  // Function to search for cities matching the query (not needed)
  /*const getSearchCity = async() => {
    try{
      const response = await axios.get('https://weather-app-xv4x.onrender.com/search-city', {
        params: { query: city },
      });
      console.log('Search City data:', response.data);
      setSearchCity(response.data);
      setError(null);
    } catch(error){
      setSearchCity(null);
    }
  };*/

  // Function to handle the main search operation
  const handleSearch = async () => {
    await getWeather();
    await getWeeklyForecast();
  };

  // Handle pressing "Enter" to trigger a search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">THE WEATHER APP</h1>
        
        {/* Search container for user input and search button */}
        <div className="city-search-container">
          {/* Input field for entering the city */}
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
          {/* Search button */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <span className="material-symbols-outlined" onClick={handleSearch}>
          search
          </span>
        </div>
        
        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        {/* Display current weather location if weather data is available */}
        {weather && ( <h2 className="location">{weather.location.name}, {weather.location.region}, {weather.location.country}</h2>)}
        
        <div className="weather-card-container">
          
          {/* Card for current weather data */}
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
          
          {/* Cards for the weekly forecast */}
          {weeklyForecast && (
            <div className="weekly-forecast-cards">
              
              {/* Card for tomorrow's weather */}
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
              
              {/* Card for the day after tomorrow's weather */}
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