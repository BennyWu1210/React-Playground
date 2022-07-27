import React from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-button">
        <h2>React Playground</h2>
      </div>
      <div className="navbar-links">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              Blablabl
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              Blabla
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              Blabla
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavBar;
