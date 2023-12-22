import React, { useReducer, useRef, useEffect, useContext } from "react";
import "./../styles/our-products.css";
import { FunctionsContext } from "../App.js";

const initialState = {
  ourProducts: [],
  loading: true,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set-our-products":
      return {
        ...state,
        ourProducts: action.payloads,
        loading: false,
        error: ""
      };
    case "set-loading":
      return {
        ...state,
        loading: action.loading,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: "Something went wrong!",
      };
    default:
      return state;
  }
};

const OurProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { ourProducts, error, loading } = state;
  const cardListRef = useRef();
  const {
    sendDataToServerAndMovePage,
    getImage,
    formatCurrency,
    addProductsToState,
  } = useContext(FunctionsContext);

  const addOurProducts = () => {
    dispatch({ type: "set-loading", loading: true });

    addProductsToState("/api/our-products", "set-our-products", dispatch);
  };

  const renderCards = ({ image, title, price, id, description }) => {
    return (
      <div
        className="card"
        key={id}
        onClick={() =>
          sendDataToServerAndMovePage("product-info", {
            id,
            image,
            title,
            description,
            price,
          })
        }
      >
        <img src={getImage(image)} alt="card" className="card-image"/>
        <div className="card-info">
          <h5 className="title">{title}</h5>
          <p className="price">{formatCurrency(price)}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    addOurProducts("our-products");
  }, []);

  return (
    <section className="our-products" id="our-products">
      <div className="our-products-title">
        <h2>Our Products</h2>
        <p>Temukan buku favorit anda di toko kami</p>
      </div>
      <div className="card-list" ref={cardListRef}>
        {ourProducts
          ? ourProducts.map((product) => {
              return renderCards(product);
            })
          : null}
      </div>
      {loading && <h3>Loading...</h3>}
      {error !== "" && <h3 className="error-msg dua">{error}</h3>}
    </section>
  );
};

export default OurProduct;
