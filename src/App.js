import React, { createContext, useEffect, useReducer, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductInfo from "./pages/ProductInfo";
import "./styles/navbar.css";
import "./styles/reset.css";
import "./App.css";
import axios from "axios";
import { getImage, getProducts, addProductsToState } from "./utils/utils.js";

export const FunctionsContext = createContext();

const initialState = {
  count: 1,
  products: [],
  formValues: { name: "", email: "", location: "" },
  error: "",
  isButtonDisabled: true,
  loading: true,
  productInfo: [],
  error2: "",
  infoLoading: true,
  productItems: JSON.parse(window.localStorage.getItem("product-items")) || {
    items: [],
    userDetail: {},
  },
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
        count: state.count - 1 < 1 ? 1 : state.count - 1,
      };
    case "set-form-values":
      console.log("form values", action.payload);
      return {
        ...state,
        formValues: {
          name: action.payload.name,
          email: action.payload.email,
          location: action.payload.location,
        },
      };
    case "set-products":
      return {
        ...state,
        products: action.payload,
      };
    case "checkout":
      return {
        ...state,
        productItems: {
          items: state.productItems.items,
          userDetail: {
            name: action.payload.name,
            email: action.payload.email,
            location: action.payload.location,
          },
        },
      };
    case "set-product-items":
      const existingItemIndex = state.productItems.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its count
        const updatedProductItems = state.productItems.items.map(
          (item, index) =>
            index === existingItemIndex
              ? { ...item, count: action.payload.count }
              : item
        );

        return {
          ...state,
          productItems: {
            items: updatedProductItems,
            userDetail: state.productItems.userDetail,
          },
        };
      } else {
        // If the item is not in the cart, add it
        return {
          ...state,
          productItems: {
            items: [...state.productItems.items, action.payload],
            userDetail: state.productItems.userDetail,
          },
        };
      }
    case "set-product-info":
      return {
        ...state,
        productInfo: action.payload,
      };
    case "set-loading":
      return {
        ...state,
        loading: action.loadingValue,
      };
    case "set-info-loading":
      return {
        ...state,
        infoLoading: action.loadingValue,
      };
    case "set-error":
      return {
        ...state,
        error: action.errorData,
      };
    case "set-error2":
      return {
        ...state,
        error2: action.errorData,
      };
    default:
      return {
        state,
      };
  }
};

const App = () => {
  const navigate = useNavigate();
  const serverUrl = "http://localhost:5000";
  const clientUrl = "http://localhost:3000";
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    count,
    productItems,
    products = [],
    productInfo = [],
    loading,
    name,
    isButtonDisabled,
    email,
    location,
    error,
    infoLoading,
    error2,
  } = state;
  const containerCartRef = useRef();


  const sendDataToServerAndMovePage = async (
    endpoint,
    { id, title, image, description, price, count = 0 }
  ) => {
    console.log("send data to server");
    const url = `${serverUrl}/api/${endpoint}`;
    const locationUrl = window.location.href;
    const productInfoUrl = `${clientUrl}/product-info`;

    try {
      await axios.post(url, { title, id, image, description, price, count });

      if (locationUrl === productInfoUrl) return window.location.reload();
      return movePage(endpoint);
    } catch (err) {
      console.log("Failed send data to server!");
    }
  };

  const cartToggle = () => {
    display
      ? (containerCartRef.current.style.display = "block")
      : (containerCartRef.current.style.display = "none");
  };

  const movePage = (url) => {
    navigate(url);
  };

  const handleInputChange = (e) => {
    dispatch({
      type: "set-form-values",
      payload: { name: e.target.value },
    });

    if (name === "" || email === "" || location === "") return;
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    cartToggle();
  }, [display]);

  const formatMessage = (data) => {
    console.log("data", data);
    return `Halo ${data.userDetail.name},

    Terima kasih telah memesan buku dengan kami. Berikut adalah detail pesanan Anda:
    
    Nama: ${data.userDetail.name}
    Email: ${data.userDetail.email}
    Alamat Pengiriman: ${data.userDetail.location}
    Detail Pesanan:
    ${data.items.map((item, index) => {
      return `
        ${index + 1}. Buku "${item.title}"
        - Jumlah: ${item.count} buah
        - Harga: Rp ${item.price} per buku`;
    })}
  
    Total Pembayaran: ${
      data.items
        ? data.items.reduce((acc, item) => acc + item.price * item.count, 0)
        : 0
    }
    
    Mohon segera konfirmasikan pesanan Anda dan informasikan metode pembayaran yang Anda pilih. Setelah kami menerima pembayaran, pesanan akan segera diproses.
    
    Terima kasih atas kepercayaan Anda kepada kami.
    
    Salam,
    Al Store
    `;
  };

  const handleCheckout = () => {
    // if (name.length <= 2)
    //   return setErrors({ errorName: "Name shoud atleast 3 chars!" });

    // if (name.length <= 2)
    //   return setErrors({ errorName: "Name shoud atleast 3 chars!" });

    dispatch({ type: "checkout", payload: { name, email, location } });

    const message = formatMessage(productItems);
    console.log(productItems);
    console.log(message);

    window.open(
      `http://wa.me/62881027057536?text=${encodeURIComponent(message)}`
    );
  };

  useEffect(() => {
    window.localStorage.setItem("product-items", JSON.stringify(productItems));
    console.log(productItems);
  }, [productItems]);

  return (
    <div className="App">
      <FunctionsContext.Provider
        value={{
          sendDataToServerAndMovePage,
          getImage,
          serverUrl,
          getProducts,
          addProductsToState,
          dispatch,
          productItems,
          name,
          email,
          location,
          count,
          products,
          handleCheckout,
          productInfo,
          loading,
          error,
          infoLoading,
          error2,
          isButtonDisabled,
          handleInputChange,
        }}
      >
        <Navbar
          count={productItems.items ? productItems.items.length : 0}
          productItems={productItems}
        />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product-info" exact element={<ProductInfo />} />
        </Routes>
      </FunctionsContext.Provider>
    </div>
  );
};

export default App;
