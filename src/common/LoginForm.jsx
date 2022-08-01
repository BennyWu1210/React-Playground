import React from "react";
import "./LoginForm.css";

function LoginForm() {
  const handleSumbit = (e) => {
    // prevent the default behaviour of this form
    e.preventDefault();

    // Call the server
    console.log("Submitted");
  };

  return (
    <div className="login-container">
      <h2>Login 🚀</h2>
      <form onSubmit={handleSumbit}>
        <div className="login-group">
          <label htmlFor="username">Username</label>
          <div className="login-field">
            <input id="username" type="text" className="login-control" />
          </div>
        </div>
        <div className="login-group">
          <label htmlFor="password">Password</label>
          <div className="login-field">
            <input id="password" type="text" className="login-control" />
          </div>
        </div>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}
export default LoginForm;
