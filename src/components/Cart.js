import React, {
  useContext,
} from "react";
import cartStyles from "../styles/cart.module.css";
import { FunctionsContext } from "../App";

function Cart() {
  const {
    productItems,
    handleCheckout,
    name,
    email,
    location,
    isButtonDisabled,
    handleInputChange,
    containerCartRef,
    formatCurrency,
    handleDecrement,
    handleIncrement,
    handleRemove
  } = useContext(FunctionsContext);

  

  return (
    <>
      <div className={cartStyles["container-cart"]} ref={containerCartRef}>
        <main className={cartStyles.wrapper}>
          <section className={cartStyles["cart-list"]}>
            <h3 className={cartStyles["cart-title"]}>Shopping Cart</h3>
            {productItems.items ? productItems.items.length !== 0 ? (
              productItems.items.map((item, index) => (
                <React.Fragment key={item._id} >
                  <div className={cartStyles["cart"]}>
                    <figure className={cartStyles["cart-image"]}>
                      <img src={`img/${item.image}`} alt="Laptop" />
                    </figure>
                    <div className={cartStyles["info"]}>
                      <div>
                      <h4 className="product-title">{item.title}</h4>
                      <p className="price">
                        {formatCurrency(item.price)}
                      </p>
                        </div> 

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
                      {formatCurrency(item.price * item.count)}
                    </h4>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <p>Keranjang anda masih kosong!</p>
            ) : null}
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
                      _id="name"
                      value={name}
                      onInput={handleInputChange}
                      onChange={handleInputChange}
                    />
                    <br /> 
                  </label>
                  <label htmlFor="email">
                    Email <br />
                    <input
                      type="email"
                      onInput={handleInputChange}
                      name="email"
                      _id="email"
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
                      _id="location"
                      value={location}
                      onChange={handleInputChange}
                    />
                  </label>
                </form>
                <p className={cartStyles.total}>
                  Total{" "}
                  <span>
                    {productItems.items
                      ? formatCurrency(
                          productItems.items.reduce(
                            (acc, item) => acc + item.price * item.count,
                            0
                          )
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
