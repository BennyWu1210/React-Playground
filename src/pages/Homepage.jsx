import React from "react";
import "./Homepage.css";
import Navbar from "../components/shared/Navbar";

const Homepage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <h1 className="home-title">We touch fish</h1>
    </div>
  );
};
export default Homepage;
