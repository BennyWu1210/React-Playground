import React from "react";
import "./Button.css";

const Button = ({ onSubmit, height, width, color, border, children }) => {
  return (
    <div
      className="button-container"
      onClick={onSubmit}
      style={{
        height: height,
        width: width,
        backgroundColor: `var(--${color})`,
        border: border,
      }}
    >
      {children}
    </div>
  );
};
export default Button;
