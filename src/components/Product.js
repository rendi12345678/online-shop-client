import React, { useReducer, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"
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
  const location = useLocation();
  const { image, title, price, _id, description } = location.state;
  

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

  const addProductToCart = ({
    image,
    title,
    price,
    _id,
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
        _id,
        description,
        count,
      },
    });
  };

  return (
    <>
      <section className="product">
              <div className="product-images">
                <img
                  src={getImage(image)}
                  alt="book"
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
                        _id,
                        description,
                        count,
                      })
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
      </section>
    </>
  );
};

export default Product;
