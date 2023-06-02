import { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef((props, ref) => {
  return (
    <div className="input">
      <label style={{ color: props.color }} htmlFor={props.input.id}>
        {props.label}
      </label>
      {/* Keep this in mind!! Always make it reusuable */}
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
