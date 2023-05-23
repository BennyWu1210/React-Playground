import React from "react";
import "./Button.css";

const Button = ({onSubmit}) => {
  return (
    <div className="button-container" onClick={onSubmit}>
      <span>Click me!!</span>
    </div>
  );
};
export default Button;