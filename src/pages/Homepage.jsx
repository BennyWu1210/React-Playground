import React from "react";
import "./Homepage.css";
import Navbar from "../components/shared/Navbar";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <div className="home-page">
      <Navbar /> 
      <div className="home-content">
        <span>Welcome to Benny's</span>
        <br></br>
        <motion.span
          id="title"
          initial={{ position: "relative", opacity: 0, top: -20 }}
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 2 }}
        >
          React Playground.
        </motion.span>
      </div>
    </div>
  );
};
export default Homepage;
