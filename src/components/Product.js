import React, { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { FunctionsContext } from "../App.js";

const Product = () => {
  const {
    getImage,
    serverUrl,
    count,
    productInfo,
    error,
    infoLoading,
    formatCurrency,
    dispatch,
  } = useContext(FunctionsContext);

  const addDataToState = (url, action) => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data.productData;

        successResponse(action, data);
      })
      .catch((err) => {
        const errorMsg = "Failed fetching data!";

        errorResponse(action, errorMsg);
      });
  };

  const successResponse = (action, data) => {
    if (action === "set-product-info") {
      dispatch({ type: "set-product-info", payload: data });
      dispatch({ type: "set-error", errorData: "" });
      dispatch({ type: "set-info-loading", loadingValue: false });
    }
  };

  const errorResponse = (action, errorMsg) => {
    if (action === "set-product-info") {
      dispatch({ type: "set-error", errorData: errorMsg });
      dispatch({ type: "set-info-loading", loadingValue: false });
    }
  };

  const fetchData = () => {
    addDataToState(`${serverUrl}/api/product-info`, "set-product-info");
  };

  const addProductToCart = ({
    image,
    title,
    price,
    id,
    description,
    count,
  }) => {
    console.log(title);
    dispatch({
      type: "set-product-items",
      payload: {
        image,
        title,
        price,
        id,
        description,
        count,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="product">
        {productInfo.length !== 0 &&
          infoLoading === false &&
          productInfo.map(({ image, title, price, id, description }) => (
            <React.Fragment key={id}>
              <div className="product-images">
                <img
                  src={getImage(image)}
                  alt="laptop"
                  className="main-image"
                />
                <figure className="other-images">
                  <img src={getImage(image)} alt="laptop" />
                  <img src={getImage(image)} alt="laptop" />
                  <img src={getImage(image)} alt="laptop" />
                </figure>
              </div>
              <div className="product-info">
                <h1>{title}</h1>
                <h3>{formatCurrency(price)}</h3>
                <p>{description}</p>
                <div className="buttons">
                  <div className="counter">
                    <button
                      className="decrement"
                      onClick={() => dispatch({ type: "decrement" })}
                    >
                      -
                    </button>
                    <p className="count">{count}</p>
                    <button
                      className="increment"
                      onClick={() => dispatch({ type: "increment" })}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() =>
                      addProductToCart({
                        image,
                        title,
                        price,
                        id,
                        description,
                        count,
                      })
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        {error !== "" && <h3 className="error-msg">{error}</h3>}
        {infoLoading && <h3 className="loading">Loading...</h3>}
      </section>
    </>
  );
};

export default Product;
