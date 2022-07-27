import React from "react";
import NavBar from "../NavBar";
import "./Home.css";

function Home() {
  return (
    <div className="main-page">
      <NavBar />
      <div className="hero-container">
        <div className="description-container">
          <div className="decoration">
            <span className="dot" id="dot1" />
            <span className="dot" id="dot2" />
            <span className="dot" id="dot3" />
            <span className="dot" id="dot4" />
            <span className="dot" id="dot5" />
            <span className="dot" id="dot6" />
          </div>
          <div className="description">
            <h3>Description:</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              amet ducimus officia eum blanditiis harum, provident, nulla atque
              nesciunt sed suscipit illo. Sunt iste totam, voluptate eveniet
              aperiam distinctio iure modi officiis impedit odio ducimus soluta
              odit quibusdam vel pariatur.
            </p>
          </div>
        </div>
        <div className="hero-content">
          <img id="benny-avatar" src={require("../images/benny-avatar.jpeg")} />
          <h1 id="title">Benny's React Playground</h1>
        </div>
      </div>
    </div>
  );
}
export default Home;
