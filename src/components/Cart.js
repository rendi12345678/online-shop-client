import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  useContext,
} from "react";
import cartStyles from "../styles/cart.module.css";
import { FunctionsContext } from "../App";

function Cart({ display, productItems: newProductItems }) {
  const { productItems, dispatch, handleCheckout, name, email, location, isButtonDisabled, handleInputChange, cartToggle, containerCartRef, display } =
    useContext(FunctionsContext);
  const [errors, setErrors] = useState({
    errorName: "",
    errorEmail: "",
    errorLocation: "",
  });

  const { errorName, errorEmail, errorLocation } = errors;

  const handleRemove = (item) => {
    // setproductItems((prevProducts) => ({
    //   ...prevProducts,
    //   items: prevProducts.items.filter((prevItem) => prevItem.id !== item.id),
    // }));
  };

  const handleIncrement = (item) => {
    // setproductItems((prevProducts) =>
    //   prevProducts.items.map((prevItem) => {
    //     return prevItem.id === item.id
    //       ? { ...prevItem, count: prevItem.count + 1 }
    //       : prevItem;
    //   })
    // );
  };

  const handleDecrement = (item) => {
    // setproductItems((prevProducts) =>
    //   prevProducts.items.map((prevItem) => {
    //     return prevItem.id === item.id
    //       ? {
    //           ...prevItem,
    //           count: prevItem.count - 1 < 1 ? 1 : prevItem.count - 1,
    //         }
    //       : prevItem;
    //   })
    // );
  };

  return (
    <>
      <div className={cartStyles["container-cart"]} ref={containerCartRef}>
        <main className={cartStyles.wrapper}>
          <section className={cartStyles["cart-list"]}>
            <h3 className={cartStyles["cart-title"]}>Shopping Cart</h3>
            {productItems.items && productItems.items.length !== 0 ? (
              productItems.items.map((item, index) => (
                <>
                  <div key={index} className={cartStyles["cart"]}>
                    <figure className={cartStyles["cart-image"]}>
                      <img src={`img/${item.image}`} alt="Laptop" />
                    </figure>
                    <div className={cartStyles["info"]}>
                      <h4 className="product-title">{item.title}</h4>
                      <p className="price">Rp {item.price}</p>
                      <div className={cartStyles.counter}>
                        <button
                          className={`${cartStyles.decrement} ${cartStyles.btn}`}
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </button>
                        <p className={cartStyles.count}>{item.count}</p>
                        <button
                          className={`${cartStyles.decrement} ${cartStyles.btn}`}
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className={cartStyles["delete-product"]}
                      onClick={() => handleRemove(item)}
                    >
                      X
                    </button>
                    <h4 className={cartStyles["product-total-price"]}>
                      Rp {item.price * item.count}
                    </h4>
                  </div>
                </>
              ))
            ) : (
              <p>Keranjang anda masih kosong!</p>
            )}
          </section>
          <section className={cartStyles["summary"]}>
            <div className={cartStyles.prices}>
              <h4>Pembayaran</h4>
              <div className={cartStyles.cost}>
                <form className={cartStyles["form"]}>
                  <label htmlFor="name">
                    Nama <br />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onInput={handleInputChange}
                      onChange={handleInputChange}
                    />
                    <br /> <p>{errorName !== "" && errorName}</p>
                  </label>
                  <label htmlFor="email">
                    Email <br />
                    <input
                      type="email"
                      onInput={handleInputChange}
                      name="email"
                      id="email"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label htmlFor="location">
                    Alamat <br />
                    <input
                      type="location"
                      onInput={handleInputChange}
                      name="location"
                      id="location"
                      value={location}
                      onChange={handleInputChange}
                    />
                  </label>
                </form>
                <div></div>
                <p className={cartStyles.total}>
                  Total{" "}
                  <span>
                    Rp{" "}
                    {productItems.items
                      ? productItems.items.reduce(
                          (acc, item) => acc + item.price * item.count,
                          0
                        )
                      : 0}
                  </span>
                </p>
              </div>
              <button
                className={cartStyles.checkout}
                disabled={isButtonDisabled}
                style={{
                  padding: "10px",
                  backgroundColor: isButtonDisabled
                    ? "#ccc"
                    : "var(--blue-color)",
                  color: isButtonDisabled ? "#666" : "#fff",
                  cursor: isButtonDisabled ? "not-allowed" : "pointer",
                  /* Add more styles as needed */
                }}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Cart;
