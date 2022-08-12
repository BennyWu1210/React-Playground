import { React, useState } from "react";
import "./RegistrationForm.css";
import { schema } from "joi-browser";
import Joi from "joi-browser";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password").min(5).max(20),
    email: Joi.string().required().label("Email").email(),
  };

  const validate = () => {
    const result = Joi.validate({ username, password, email }, schema, {
      abortEarly: false,
    });

    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

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
    <div className="reg-container">
      <h2>Registration 🔥</h2>

      <form onSubmit={handleSumbit}>
        {/* Username */}
        <div className="reg-group">
          <label htmlFor="username">Username</label>
          <div className="reg-field">
            <input
              autoFocus
              id="username"
              type="text"
              className="reg-control"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          {errors.username && (
            <div className="reg-alert">{errors.username}</div>
          )}
        </div>

        {/* Password */}
        <div className="reg-group">
          <label htmlFor="password">Password</label>
          <div className="reg-field">
            <input
              value={password}
              id="password"
              type="text"
              className="reg-control"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {errors.password && (
            <div className="reg-alert">{errors.password}</div>
          )}
        </div>

        {/* Email */}
        <div className="reg-group">
          <label htmlFor="email">Email</label>
          <div className="reg-field">
            <input
              value={email}
              id="email"
              type="text"
              className="reg-control"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          {errors.email && <div className="reg-alert">{errors.email}</div>}
        </div>
        <button className="reg-button">Sign Up</button>
      </form>
    </div>
  );
}
export default RegistrationForm;
