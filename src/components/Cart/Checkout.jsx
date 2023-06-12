import "./Checkout.css";

const Checkout = (props) => {
  return (
    <form>
      <div className={"checkout-control"}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name"></input>
      </div>
      <div className={"checkout-control"}>
        <label htmlFor="street">street</label>
        <input type="text" id="street"></input>
      </div>
      <div className={"checkout-control"}>
        <label htmlFor="postal">postal</label>
        <input type="text" id="postal"></input>
      </div>
      <div className={"checkout-control"}>
        <label htmlFor="City">City</label>
        <input type="text" id="city"></input>
      </div>
    </form>
  );
};
export default Checkout;
