import "./Cart.css";
import Modal from "../shared/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};
  const cartItemAddHandler = (id) => {};
  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className="cart-total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className="cart-actions">
        <button className="cart-button--alt" onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className="cart-button">Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
