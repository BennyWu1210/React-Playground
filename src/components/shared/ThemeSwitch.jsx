import React, { useState } from "react";
import "./ThemeSwitch.css";
import LightMode from "../../assets/icons/theme/light-mode.png";
import DarkMode from "../../assets/icons/theme/dark-mode.png";

const ThemeSwitch = ({mode, setTheme}) => {

  // TODO: Turn this into an animation (and make it global)
  return <div className="switch-container" onClick={setTheme}>
    <img src={mode === "light" ? LightMode : DarkMode}/>
  </div>;
};
export default ThemeSwitch;
