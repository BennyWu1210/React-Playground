import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const linkInfo = [
  { to: "/", text: "Home" },
  { to: "/fun-fact-generator", text: "Fun Fact Generator" },
  { to: "/weather-app", text: "Weather App" },
  { to: "/food-ordering", text: "Food Ordering" },
  { to: "/chat/login", text: "Login" },
];

const navVariants = {
  displayed: {
    clipPath: "circle(1500px at calc(50% + 18px) 10%)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(33px at calc(50% + 18px) 10%)",
    transition: {
      delay: 0.15,
      type: "spring",
      stiffness: 250,
      damping: 50,
    },
  },
};

const linkVariants = {
  displayed: {
    opacity: 1,
    trnasition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    opacity: 0,
    y: 50,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const linksVariants = {
  displayed: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const SVG = (
  <svg width="23" height="23" viewBox="0 0 23 15">
    <Path
      variants={{
        closed: { d: "M 2 2.5 L 20 2.5" },
        displayed: { d: "M 3 16.5 L 17 2.5" },
      }}
    />
    <Path
      d="M 2 9.423 L 20 9.423"
      variants={{
        closed: { opacity: 1 },
        displayed: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
    />
    <Path
      variants={{
        closed: { d: "M 2 16.346 L 20 16.346" },
        displayed: { d: "M 3 2.5 L 17 16.346" },
      }}
    />
  </svg>
);

const Navbar = () => {
  const [displayed, setDisplayed] = useState(false);

  const toggleDisplay = () => {
    setDisplayed((prevState) => !prevState);
    console.log(displayed);
  };

  const navLinks = linkInfo.map((info) => (
    <motion.li
      id={info.to}
      variants={linkVariants}
      whileHover={{ scale: 1.05 }}
    >
      <Link className="nav-link" to={info.to}>
        {info.text}
      </Link>
    </motion.li>
  ));

  return (
    <motion.nav
      initial={false}
      className="nav-container"
      animate={displayed ? "displayed" : "closed"}
    >
      <motion.div
        className="nav-background"
        variants={navVariants}
      ></motion.div>
      <motion.button onClick={toggleDisplay}>{SVG}</motion.button>

      <motion.ul
        className="nav-links"
        variants={linksVariants}
        // exit={{ y: -5, opacity: 0 }}
      >
        {navLinks}
      </motion.ul>
    </motion.nav>
  );
};
export default Navbar;
