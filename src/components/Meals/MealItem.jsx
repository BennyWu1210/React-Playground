import { useContext } from "react";
import "./MealItem.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = ({ name, price, description, id }) => {
  const cartCtx = useContext(CartContext);
  const formattedPrice = `$${price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className="mealitem">
      <div>
        <h3>{name}</h3>
        <div className="mealitem-description">{description}</div>
        <div className="mealitem-price">{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
