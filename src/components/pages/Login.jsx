import React from "react";
import LoginForm from "../../common/LoginForm";
import NavBar from "../NavBar";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <NavBar />
      <div className="login-content">
        <div className="login-decoration">
          <div className="decoration-image">
            <img src={require("../images/Plant.png")} />
          </div>
          <div className="decoration-text">
            <h1>OYAYA!</h1>
            <h4>React is so fun</h4>
          </div>
        </div>
        <div className="login-info">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
export default Login;
