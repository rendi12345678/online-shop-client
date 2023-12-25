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
  display: false,
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
    case "reset-user-detail":
      return {
        ...state,
        productItems: {
          items: state.productItems.items,
          userDetail: action.payload,
        },
      };
    case "set-form-values":
      console.log("form values", action.payload);
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
    case "set-products":
      return {
        ...state,
        products: action.payload,
      };
    case "checkout":
      console.log(action.payload, "payload");
      return {
        ...state,
        productItems: {
          items: state.productItems.items,
          userDetail: { ...state.productItems.userDetail, ...action.payload },
        },
      };
    case "set-product-items":
      console.log("prev item data:", state.productItems.items)
      console.log("item data:", action.payload)
      console.log("item id:", action.payload._id)
      const existingItem = state.productItems.items.find(
        (item) => item._id === action.payload._id
      );

      console.log("exixting item :", existingItem)

      if (existingItem) {
        console.log(existingItem)
        console.log("Passed")
        const updatedProductItems = state.productItems.items.map(
          (item, index) => 
          existingItem._id === item._id ? {
            ...item,
            count: action.payload.count + item.count,
          } : item
        );

        console.log("Updated product items :", updatedProductItems)

        return {
          ...state,
          productItems: {
            items: updatedProductItems,
            userDetail: state.productItems.userDetail,
          },
        };
      } else {
        return {
          ...state,
          productItems: {
            items: [...state.productItems.items, action.payload],
            userDetail: state.productItems.userDetail,
          },
        };
      }
    case "set-display":
      return { ...state, display: action.payload };
    case "set-button-is-disabled":
      return { ...state, isButtonDisabled: action.payload };
    case "set-product-info":
      return {
        ...state,
        productInfo: action.payload,
      };
    case "update-increment-count":
      const updatedIncrementCount = state.productItems.items.map((prevItem) => {
        return prevItem._id === action.payload._id
          ? { ...prevItem, count: prevItem.count + 1 }
          : prevItem;
      });
      return {
        ...state,
        productItems: {
          items: updatedIncrementCount,
          userDetail: state.productItems.userDetail,
        },
      };
    case "update-decrement-count":
      const updatedDecrementCount = state.productItems.items.map((prevItem) => {
        return prevItem._id === action.payload._id
          ? {
              ...prevItem,
              count: prevItem.count - 1 < 1 ? 1 : prevItem.count - 1,
            }
          : prevItem;
      });

      return {
        ...state,
        productItems: {
          items: updatedDecrementCount,
          userDetail: state.productItems.userDetail,
        },
      };

    case "remove-cart":
      return {
        ...state,
        productItems: {
          items: state.productItems.items.filter(
            (prevItem) => prevItem._id !== action.payload._id
          ),
          userDetail: state.productItems.userDetail,
        },
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
   const serverUrl = "https://lovely-tan-dove.cyclic.app";
   const clientUrl = "https://ilham-store.web.app";
  // const serverUrl = "http://localhost:5000";
//   const clientUrl = "http://localhost:3000";
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    count,
    productItems,
    products = [],
    productInfo = [],
    formValues,
    loading,
    display,
    isButtonDisabled,
    error,
    infoLoading,
    error2,
  } = state;
  const containerCartRef = useRef();
  const { name, email, location } = formValues;
  const ourProductsRef = useRef();

  const sendDataToServerAndMovePage = async (
    endpoint,
    { _id, title, image, description, price, count = 0 }
  ) => {
    console.log("send data to server");
    console.log("DATA TO SEND :", title);
    const url = `${serverUrl}/api/${endpoint}`;
    console.log("URL :", url);
    const locationUrl = window.location.href;
    const productInfoUrl = `${clientUrl}/product-info`;

    try {
      const response = await axios.post(url, {
        title,
        _id,
        image,
        description,
        price,
        count,
      });
      console.log("Response from server :", response.data);

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

  const handleRemove = (item) => {
    dispatch({ type: "remove-cart", payload: item });
  };

  const handleIncrement = (item) => {
    dispatch({ type: "update-increment-count", payload: item });
  };

  const handleDecrement = (item) => {
    dispatch({ type: "update-decrement-count", payload: item });
  };

  const movePage = (url) => {
    navigate(url);
  };

  const formatCurrency = (amount, locale = "id-ID") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (e) => {
    dispatch({
      type: "set-form-values",
      payload: { [e.target.name]: e.target.value },
    });

    if (
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.location === ""
    )
      return;
    dispatch({ type: "set-button-is-disabled", payload: false });
  };

  useEffect(() => {
    cartToggle();
  }, [display]);

  const formatMessage = (data) => {
    console.log("data", data);
    return `Halo ${name},

    Terima kasih telah memesan buku dengan kami. Berikut adalah detail pesanan Anda:
    
    Nama: ${name}
    Email: ${email}
    Alamat Pengiriman: ${location}
    Detail Pesanan:
    ${data.items.map((item, index) => {
      return `
        ${index + 1}. Buku "${item.title}"
        - Jumlah: ${item.count} buah
        - Harga: ${formatCurrency(item.price)} per buku`;
    })}
  
    Total Pembayaran: ${
      data.items
        ? formatCurrency(
            data.items.reduce((acc, item) => acc + item.price * item.count, 0)
          )
        : 0
    }
    
    Mohon segera konfirmasikan pesanan Anda dan informasikan metode pembayaran yang Anda pilih. Setelah kami menerima pembayaran, pesanan akan segera diproses.
    
    Terima kasih atas kepercayaan Anda kepada kami.
    
    Salam,
    Al Store
    `;
  };

  const handleCheckout = () => {
    dispatch({ type: "checkout", payload: formValues });

    const message = formatMessage(productItems);

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
          containerCartRef,
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
          formatCurrency,
          handleDecrement,
          handleIncrement,
          handleRemove,
          ourProductsRef,
          movePage
        }}
      >
        <Navbar
          count={productItems.items ? productItems.items.length : 0}
          productItems={productItems}
          display={display}
          dispatch={dispatch}
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
