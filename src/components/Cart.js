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
        <main className={cartStyles.wrapper}>
          <section className={cartStyles["cart-list"]}>
            <h3 className={cartStyles["cart-title"]}>Shopping Cart</h3>
            <div className={cartStyles["cart"]}>
              <figure className={cartStyles["cart-image"]}>
                <img src="/img/asus-zenbook.png" alt="Laptop" />
              </figure>
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
              <h4 className={cartStyles["product-total-price"]}>
                Rp 6.000.000
              </h4>
            </div>
            <div className={cartStyles["cart"]}>
              <figure className={cartStyles["cart-image"]}>
                <img src="/img/asus-zenbook.png" alt="Laptop" />
              </figure>
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
              <h4 className={cartStyles["product-total-price"]}>
                Rp 6.000.000
              </h4>
            </div>
            <div className={cartStyles["cart"]}>
              <figure className={cartStyles["cart-image"]}>
                <img src="/img/asus-zenbook.png" alt="Laptop" />
              </figure>
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
              <h4 className={cartStyles["product-total-price"]}>
                Rp 6.000.000
              </h4>
            </div>
          </section>
          <section className={cartStyles["summary"]}>
            <h3>Summary</h3>
            <div className={cartStyles.prices}>
              <p>Sub Total : Rp 10.000.000</p>
              <p>Ongkir : Rp 20.000</p>
              <p>Total : Rp 10.020.000</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Cart;
