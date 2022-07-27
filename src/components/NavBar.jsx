import React from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-container">
      <div className="nav-button">
        <h2>React Playground</h2>
      </div>
      <div className="nav-links">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Blablabl
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Blabla
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Blabla
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavBar;
