import React, { useEffect, useReducer, useRef } from "react";
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

function Cart({display}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count } = state;
  const containerCartRef = useRef();

  const cartToggle = () => {
    display ? containerCartRef.current.style.display = "block" : containerCartRef.current.style.display = "none";
  }

  useEffect(() => {
    cartToggle();
  }, [display])

  return (
    <>
      <div className={cartStyles["container-cart"]} ref={containerCartRef}>
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
            <div className={cartStyles.prices}>
              <h4>Summary</h4>
              <div className={cartStyles.cost}>
                <p>Sub total <span>Rp 10.000.000</span></p>
                <p>Ongkir <span>Rp 20.000</span></p>
                <div></div>
                <p className={cartStyles.total}>Total <span>Rp 10.020.000</span></p>
              </div>
              <button className={cartStyles.checkout}>Checkout</button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Cart;
