import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [displayed, setDisplayed] = useState(true);

  const toggleDisplay = () => {
    setDisplayed((prevState) => !prevState);
    console.log(displayed);
  };

  return (
    <div className="nav-container">
      {/* Will use this ugly button for now, create global styles later */}
      <button onClick={toggleDisplay}></button>
      <h2>Ugly nav bar</h2>
      <div className={`nav-links ${displayed ? "" : "hidden"}`}>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/fun-fact-generator">
          Fun Fact Generator
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
