import React, {useEffect, useState, createContext, useReducer} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductInfo from './pages/ProductInfo';
import './styles/navbar.css';
import './styles/reset.css';
import './App.css';
import axios from 'axios';

export const FunctionsContext = createContext();

const App = () => {
  const navigate = useNavigate();
  const serverUrl = 'http://localhost:5000';
  
  const addProductsToState = async (endpoint, type, dispatch) => {
    const response = await getProducts(endpoint);
    
    if(response === 'FETCH_ERROR') {
      dispatch({type: 'FETCH_ERROR'});
    } 
      
    if(response.length !== 0) {
      dispatch({type: type, payloads: response})
    }
      
    console.log(response)
  }
  
  const getProducts = async endpoint => {
    try {
      const response = await axios.get(`${serverUrl}${endpoint}`);
      
      return response.data.productData;
    } catch(err) {
      return 'FETCH_ERROR';
    }
  }
  
  const sendDataToServerAndMovePage = (url, {id, title, image, description, price}) => {
    console.log('send data to server')
    const productInfoUrl = `${serverUrl}/api/product-info`;
    
    axios.post(productInfoUrl, {
      title,
      id,
      image,
      description,
      price
    })
    .then(res => {
      console.log(res.data.msg);
      
      if(url === '') return window.location.reload();
      return movePage(url);
    })
    .then(err => {
      console.log('Failed send data to server!');
    });
    
    console.log(title)
  }
  
  const movePage = url => {
    navigate(url);
  }
  
  const getImage = image => `/img/${image}`;
  
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