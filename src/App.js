import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  const API_KEY = '33f211a371df49d9b4a145043252503';

  const fetchWeatherData = async () => {
    setLoading(true); 
    setError(''); 
    setWeatherData(null); 

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeatherData(response.data); 
    } catch (err) {
      setError('Failed to fetch weather data'); 
      alert('Failed to fetch weather data'); 
    } finally {
      setLoading(false); 
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData(); 
    }
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading data...</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;