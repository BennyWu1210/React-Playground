// Import weather icons to represent the weather type
import CloudIcon from "../assets/icons/weatherIcons/clouds.png";
import ThunderIcon from "../assets/icons/weatherIcons/thunderstorm.png";
import RainIcon from "../assets/icons/weatherIcons/clouds.png";
import DrizzleIcon from "../assets/icons/weatherIcons/drizzle.png";
import SnowIcon from "../assets/icons/weatherIcons/snow.png";
import SunIcon from "../assets/icons/weatherIcons/sun.png";
import CloudsIcon from "../assets/icons/weatherIcons/clouds.png";

export const getIcons = (weatherType) => {
  // Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds
  if (weatherType === "Clouds") return CloudIcon;
  else if (weatherType === "Thunderstorm") return ThunderIcon;
  else if (weatherType === "Drizzle") return DrizzleIcon;
  else if (weatherType === "Rain") return RainIcon;
  else if (weatherType === "Snow") return SnowIcon;
  else if (weatherType === "Clouds") return CloudsIcon;
  else return SunIcon;
};
