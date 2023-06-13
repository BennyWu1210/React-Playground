import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const linkInfo = [
  { to: "/", text: "Home" },
  { to: "/fun-fact-generator", text: "Fun Fact Generator" },
  { to: "/weather-app", text: "Weather App" },
  { to: "/food-ordering", text: "Food Ordering" },
  { to: "/chat/login", text: "Login" },
];

const Navbar = () => {
  const [displayed, setDisplayed] = useState(true);

  const toggleDisplay = () => {
    setDisplayed((prevState) => !prevState);
    console.log(displayed);
  };

  const navLinks = linkInfo.map((info) => (
    <Link className="nav-link" to={info.to}>
      {info.text}
    </Link>
  ));
  return (
    <div className="nav-container">
      {/* Will use this ugly button for now, create global styles later */}
      <button onClick={toggleDisplay}></button>
      <h2>Ugly nav bar</h2>
      <div className={`nav-links ${displayed ? "" : "hidden"}`}>{navLinks}</div>
    </div>
  );
};
export default Navbar;
