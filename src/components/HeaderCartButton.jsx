import { useContext } from "react";
import "./HeaderCartButton.css";
import CartIcon from "./Cart/CartIcon";
import CartContext from "../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (accumulator, item) => accumulator + item.amount,
    0
  ); // built-in function (accumulate in Racket)

  return (
    <button className="cart-button" onClick={props.onClick}>
      <span className="cart-icon">
        {/* SVG code */}
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className="cart-badge">{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
