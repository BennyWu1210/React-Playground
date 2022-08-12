import React from "react";
import NavBar from "../NavBar";
import RegistrationForm from "../../common/RegistrationForm";
import "./Registration.css";

function Registration() {
  return (
    <div className="reg-page">
      <NavBar />
      <div className="reg-content">
        <div className="reg-decoration">
          <div className="decoration-image">
            <img src={require("../images/Flower.png")} />
          </div>
          <div className="decoration-text">
            <h1>Join us!!</h1>
            <h4>React is so fun</h4>
          </div>
        </div>
        <div className="reg-info">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
export default Registration;
