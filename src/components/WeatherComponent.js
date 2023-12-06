import React, { useState, useEffect } from "react";

function WeatherComponent() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = "cca631c9f95424fdf88dccc8793923ca";
    const city = "Berlin";
    const units = "metric";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, []);

  function getClothingSuggestions(weatherData) {
    const weatherDescription = weatherData.weather[0].main.toLowerCase();
    const temperature = Math.floor(weatherData.main.temp);

    if (temperature <= 0) {
      return "It's freezing outside! Dress very warmly.";
    } else if (weatherDescription.includes("rain")) {
      return "Don't forget to bring an umbrella and wear a rain jacket.";
    } else if (weatherDescription.includes("snow")) {
      return "Dress warmly and wear boots.";
    } else if (weatherDescription.includes("sunny")) {
      return "Enjoy the sunshine! Wear sunscreen and sunglasses.";
    } else {
      return "Wear appropriate clothing for the weather.";
    }
  }

  function getWeatherEmoji(weatherDescription) {
    if (weatherDescription.includes("Rain")) {
      return "☔️";
    } else if (weatherDescription.includes("Snow")) {
      return "❄️";
    } else if (weatherDescription.includes("Sunny")) {
      return "☀️";
    } else if (weatherDescription.includes("Mist")) {
      return "🌫️";
    } else {
      return "☁️";
    }
  }

  return (
    <div className="weather">
      {weather ? (
        <div>
          <h2>
            Weather in{" "}
            {
              // @ts-ignore
              weather.name
            }
            ,{" "}
            {
              // @ts-ignore
              weather.sys.country
            }
          </h2>
          <p>
            Temperature:{" "}
            {
              // @ts-ignore
              Math.floor(weather.main.temp)
            }
            °C
          </p>
          <p>
            Weather:{" "}
            {getWeatherEmoji(
              // @ts-ignore
              weather.weather[0].main
            )}
            {
              // @ts-ignore
              weather.weather[0].main
            }
          </p>
          <h4>{getClothingSuggestions(weather)}</h4>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherComponent;
