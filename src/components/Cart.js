import React, { useReducer } from "react";
import cartStyles from "../styles/cart.module.css";

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };

    case "decrement":
      return {
        ...state,
        count: state.count - 1 < 0 ? 0 : state.count - 1,
      };

    default:
      return state;
  }
};

function Cart() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count } = state;

  return (
    <>
      <div className={cartStyles["container-cart"]}>
        <h2 className={cartStyles["cart-title"]}>Shopping Cart</h2>
        <section className={cartStyles["cart-list"]}>
          <div className={cartStyles["cart"]}>
            <figure className={cartStyles["cart-image"]}></figure>
            <div className={cartStyles["info"]}>
              <h4 className="product-title">Asus Asus Zenbook</h4>
              <p className="price">Rp 3.000.000</p>
              <div className={cartStyles.counter}>
                <button
                  className={`${cartStyles.decrement} ${cartStyles.btn}`}
                  onClick={() => dispatch({ type: "decrement" })}
                >
                  -
                </button>
                <p className={cartStyles.count}>{count}</p>
                <button
                  className={`${cartStyles.decrement} ${cartStyles.btn}`}
                  onClick={() => dispatch({ type: "increment" })}
                >
                  +
                </button>
              </div>
            </div>
            <button className={cartStyles["delete-product"]}>X</button>
            <h4 className={cartStyles["product-total-price"]}>Rp 6.000.000</h4>
          </div>
        </section>
      </div>
    </>
  );
}

export default Cart;
