import React, { useEffect, useState } from "react";
import "./WeatherPage.css";

import ForecastCard from "../components/ForecastCard";

// Icons for weather stats
import FeelsIcon from "../assets/icons/Feels-like.png";
import HumidityIcon from "../assets/icons/Humidity.png";
import WindIcon from "../assets/icons/Wind-speed.png";
import LowHighIcon from "../assets/icons/Low-high.png";

// autocomplete API to get city name
import Autocomplete from "react-google-autocomplete";

import { getIcons } from "../utils/weather-icons";
import moment from "moment";
import ThemeSwitch from "../components/shared/ThemeSwitch";
import Navbar from "../components/shared/Navbar";

const WeatherPage = () => {
  const [url, setUrl] = useState(
    "https://source.unsplash.com/1600x900/?landscape"
  );

  const [weatherData, setWeatherData] = useState({
    city: "",
    country: "",
    temperature: 0,
    type: "Sunny",
    humidity: 0,
    windSpeed: 0,
    feelsLike: 0,
    range: [0, 0],
  });

  const [forecastData, setForecastData] = useState([
    { id: 0, day: "", type: "", range: [100, -100] },
    { id: 1, day: "", type: "", range: [100, -100] },
    { id: 2, day: "", type: "", range: [100, -100] },
    { id: 3, day: "", type: "", range: [100, -100] },
    { id: 4, day: "", type: "", range: [100, -100] },
  ]);

  const [correctInput, setCorrectInput] = useState(true);
  const [mode, setMode] = useState("light");

  const setTheme = () => {
    setBackgroundImage({ name: weatherData.city });
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Call OpenWeather API
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${43.8561}&lon=${-79.33}&appid=${
          process.env.REACT_APP_OPENWEATHER_API_KEY
        }`
      ).then((response) => response.json());

      const newWeatherData = {
        city: response.name,
        country: response.sys.country,
        temperature: Math.round((response.main.temp - 273.15) * 10) / 10.0,
        type: response.weather[0].main,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        feelsLike: Math.round((response.main.feels_like - 273.15) * 10) / 10.0,
        range: [
          Math.round((response.main.temp_min - 273.15) * 10) / 10.0,
          Math.round((response.main.temp_max - 273.15) * 10) / 10.0,
        ],
      };

      setWeatherData(newWeatherData);
    };

    fetchData();
    updateForecast(43.8561, -79.33);
  }, []);

  // Convert city name to longitude and latitude
  const getLongLat = async (place) => {
    const location = place.name ? place.name : place.formatted_address;

    try {
      // Call Google Maps API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`
      );
      const results = await response.json();
      const longitude = results.results[0].geometry.location.lng;
      const latitude = results.results[0].geometry.location.lat;

      return [latitude, longitude];
    } catch (err) {
      console.log(err);
    }
  };

  // Update forecast data
  const updateForecast = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      ).then((response) => response.json());
      const responseData = response.list;

      const currentDate = new Date();
      // let currentDay = currentDate.toLocaleString("en-US", options);
      let currentDay = moment(currentDate).format("dddd");

      let index = -1;
      const newForecastData = [
        { id: 0, day: "", type: "", range: [100, -100] },
        { id: 1, day: "", type: "", range: [100, -100] },
        { id: 2, day: "", type: "", range: [100, -100] },
        { id: 3, day: "", type: "", range: [100, -100] },
        { id: 4, day: "", type: "", range: [100, -100] },
      ];

      for (const data of responseData) {
        const date_txt = data.dt_txt.split(" ");
        const date = new Date(date_txt[0] + "T" + date_txt[1]);
        const dayOfWeek = moment(date).format("dddd");

        if (dayOfWeek !== currentDay) {
          currentDay = dayOfWeek;
          index++;
        }
        if (index === -1) continue;
        if (index === 5) break;

        newForecastData[index] = {
          id: index,
          day: dayOfWeek,
          type: data.weather[0].main,
          range: [
            Math.min(
              newForecastData[index].range[0],
              Math.round(data.main.temp_min - 273.15)
            ),
            Math.max(
              newForecastData[index].range[1],
              Math.round(data.main.temp_max - 273.15)
            ),
          ],
        };
      }

      setForecastData(newForecastData);
    } catch (err) {
      console.log(err);
    }
  };

  // Submit city name
  const submitCity = async (place) => {
    try {
      if (place) {
        // Get latitude and longitude
        const [latitude, longitude] = await getLongLat(place);

        // Call OpenWeather API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        ).then((response) => response.json());

        if (response.cod === "404") {
          setCorrectInput(false);
          return;
        }

        const newWeatherData = {
          city: response.name,
          country: response.sys.country,
          temperature: Math.round((response.main.temp - 273.15) * 10) / 10.0,
          type: response.weather[0].main,
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
          feelsLike:
            Math.round((response.main.feels_like - 273.15) * 10) / 10.0,
          range: [
            Math.round((response.main.temp_min - 273.15) * 10) / 10.0,
            Math.round((response.main.temp_max - 273.15) * 10) / 10.0,
          ],
        };

        // Reset background Image
        setBackgroundImage(place);

        // Update weather data
        setWeatherData(newWeatherData);
        setCorrectInput(true);

        // Update forecast data
        updateForecast(latitude, longitude);
      }
    } catch (err) {
      setCorrectInput(false);
      setWeatherData((prevData) => {
        return { ...prevData, city: "Incorrect city!" };
      });

      console.log("Incorrect city!");
    }
  };

  const setBackgroundImage = async (place) => {
    const location = (place.name ? place.name : place.formatted_address)
      .split(",")[0]
      .split(" ")
      .join(",");

    console.log("location: ", location);

    console.log("mode: ", mode);
    if (mode === "dark") {
      // need to make this random
      setUrl(`https://source.unsplash.com/1600x900/?night`);
    } else {
      setUrl(`https://source.unsplash.com/1600x900/?${location}`);
    }
  };

  return (
    <div
      className="weather-container"
      style={{ backgroundImage: `url(${url})` }}
    >
      <Navbar /> 
      <ThemeSwitch mode={mode} setTheme={setTheme} />
      <div id="weather-section1">
        <div className="weather-form-background"></div>
        <div className={`weather-form ${correctInput}`} action="">
          <Autocomplete
            apiKey={process.env.REACT_APP_GOOGLEMAPS_API_KEY}
            onPlaceSelected={async (place) => await submitCity(place)}
          />
        </div>

        <div className="weather-background"></div>
        <div className="weather-card" id="weather-curday">
          <div className="curday-city">
            {weatherData.city + ", " + weatherData.country}
          </div>
          <div className="curday-temp">{weatherData.temperature}°C</div>
          <div className="curday-symbol">
            <img src={getIcons(weatherData.type)} alt="weather-icon" />
          </div>
          <div className="curday-stats">
            {/* Consider outputting dynamically */}
            <div className="curday-stats-title">
              <span>Humidity</span>
              <img src={HumidityIcon} alt="Humidity" />
              <h4>{weatherData.humidity}</h4>
            </div>
            <div className="curday-stats-title">
              <span>Wind Speed</span>
              <img src={WindIcon} alt="Humidity" />
              <h4>{weatherData.windSpeed} km/h</h4>
            </div>
            <div className="curday-stats-title">
              <span>Feels Like</span>
              <img src={FeelsIcon} alt="Humidity" />
              <h4>{weatherData.feelsLike}°C</h4>
            </div>
            <div className="curday-stats-title">
              <span>Low/High</span>
              <img src={LowHighIcon} alt="Humidity" />
              <h4>
                {weatherData.range[0]}°C/{weatherData.range[1]}°C
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div id="weather-section2">
        <div className="weather-background"></div>
        <div className="weather-card" id="weather-forecast">
          <h3>5-DAY FORECAST</h3>
          {forecastData.map((data) => {
            return (
              <ForecastCard
                key={data.id}
                day={data.day}
                type={data.type}
                highest={data.range[1]}
                lowest={data.range[0]}
                hasLine={data.id !== 4 ? "true" : "false"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
