import React, { Fragment } from "react";
import mealsImage from "../assets/meals.jpg";
import "./FoodHeader.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className="food-header">
        <h1>React Food</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className="food-main-image">
        <img src={mealsImage} alt="table with food"></img>
      </div>
    </Fragment>
  );
};

export default Header;
