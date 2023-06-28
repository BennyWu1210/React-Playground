import React from "react";
import "./Homepage.css";
import Navbar from "../components/shared/Navbar";

const Homepage = () => {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: "url(https://www.meme-arsenal.com/memes/8f47c117b01db6df3360072581ea810c.jpg)",
      }}
    >
      <Navbar />
      <h1 className="home-title">We touch fish</h1>
    </div>
  );
};
export default Homepage;
