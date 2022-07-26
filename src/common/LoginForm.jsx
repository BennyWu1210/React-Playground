import { React, useState } from "react";
import "./LoginForm.css";
import { schema } from "joi-browser";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const result = Joi.validate({ username, password }, schema, {
      abortEarly: false,
    });

    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    console.log(errors);
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, { [name]: schema[name] });
    return error ? error.details[0].message : null;
  };

  const handleSumbit = (e) => {
    // prevent the default behaviour of this form
    e.preventDefault();

    setErrors(validate() || {});
    // Call the server
    console.log("Submitted");
  };

  return (
    <div className="login-container">
      <h2>Login 🚀</h2>
      <Link className="registration-link" to="/registration">
        No account yet? Sign up here!
      </Link>
      <form onSubmit={handleSumbit}>
        {/* Username */}
        <div className="login-group">
          <label htmlFor="username">Username</label>
          <div className="login-field">
            <input
              autoFocus
              id="username"
              type="text"
              className="login-control"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          {errors.username && (
            <div className="login-alert">{errors.username}</div>
          )}
        </div>

        {/* Password */}
        <div className="login-group">
          <label htmlFor="password">Password</label>
          <div className="login-field">
            <input
              value={password}
              id="password"
              type="text"
              className="login-control"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {errors.password && (
            <div className="login-alert">{errors.password}</div>
          )}
        </div>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}
export default LoginForm;
