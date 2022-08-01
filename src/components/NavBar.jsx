import React from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

function NavBar({ color }) {
  return (
    <div className="navbar-container">
      <div className="navbar-button">
        <h2>React Playground</h2>
      </div>
      <div className="navbar-links">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              asdfads
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              Blablabl
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/login">
              Login
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavBar;
