import React from "react";
import "./ForecastCard.css";
import { getIcons } from "../utils/WeatherIcons";
// This is a placeholder

const ForecastCard = ({ day, type, highest, lowest, hasLine }) => {
  return (
    <div className={`forecast-wrapper ${hasLine}`}>
      <div className="forecast-container">
        <span className="forecast-day">{day}</span>
        <div className="forecast-type">
          <img src={getIcons(type)} />
          <span>{type}</span>
        </div>
        <span className="forecast-temp">
          {lowest}°C/{highest}°C
        </span>
      </div>
    </div>
  );
};
export default ForecastCard;
