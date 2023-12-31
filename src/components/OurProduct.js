import React, { useReducer, useRef, useEffect, useContext } from "react";
import "./../styles/our-products.css";
import { FunctionsContext } from "../App.js";
import {useSetLocalStorage} from "../hooks/useSetLocalStorage.js";
import { useNavigate } from "react-router-dom"  

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
    ourProductsRef,
    formatCurrency,
    addProductsToState,
    movePage
  } = useContext(FunctionsContext);
  const [value, setValue] = useSetLocalStorage("product-info", {
    _id: "",
            image: "",
            title: "",
            description: "",
            price: 0,
  });
  const navigate = useNavigate();

  const addOurProducts = () => {
    dispatch({ type: "set-loading", loading: true });

    addProductsToState("/api/our-products", "set-our-products", dispatch);
  };
  
  const addDataToProductInfo = ({         
            _id,
            image,
            title,
            description,
            price}) => {
     navigate('/product-info', {state: {
            _id,
            image,
            title,
            description,
            price
     }});
  }

  const renderCards = ({ image, title, price, _id, description }) => {
    return (
      <div
        className="card"
        key={_id}
        onClick={() =>
           addDataToProductInfo({image, title, price, _id, description})
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
    <>
      <div className="our-products-title" id="our-products" ref={ourProductsRef}>
        <h2>Our Books</h2>
        <p>Temukan buku favorit anda di toko kami</p>
      </div>
    <section className="our-products">
      <div className="card-list" ref={cardListRef}>
        {ourProducts
          ? ourProducts.map((product) => {
              return renderCards(product);
            })
          : null}
      </div>
      {loading && <h3>Loading...</h3>}
      {error !== "" && <h3 className="error-msg dua">{error}</h3>}
    </section></>
  );
};

export default OurProduct;
