import React, {useEffect, useState, createContext, useReducer} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductInfo from './pages/ProductInfo';
import './styles/navbar.css';
import './styles/reset.css';
import './App.css';
import axios from 'axios';
import {
      getImage,
      getProducts,
      addProductsToState
   } from './utils/utils.js';

export const FunctionsContext = createContext();

const App = () => {
  const navigate = useNavigate();
  const serverUrl = 'http://localhost:5000';
  const clientUrl = 'http://localhost:3000';
  
  const sendDataToServerAndMovePage = async (endpoint, {id, title, image, description, price, count = 0}) => {
    console.log('send data to server')
    const url = `${serverUrl}/api/${endpoint}`;
    const locationUrl = window.location.href;
    const productInfoUrl = `${clientUrl}/product-info`;
  
    try {
      const response = await axios.post(url, { title, id, image, description, price, count });
    
      if(locationUrl === productInfoUrl) return window.location.reload();
      return movePage(endpoint);
    } catch(err) {
      console.log('Failed send data to server!'); 
    }
  }
  
  const movePage = url => {
    navigate(url);
  }
  
  return (
    <div className="App">
    <FunctionsContext.Provider value={{
      sendDataToServerAndMovePage,
      getImage,
      serverUrl,
      getProducts,
      addProductsToState
    }}>
      <Navbar/>
      <Routes>
        <Route path="/"
               exact
               element={<Home/>}/>
        <Route path="/product-info"
               exact
               element={<ProductInfo/>}/>
        </Routes>
    </FunctionsContext.Provider>
    </div>
  );
}

export default App;