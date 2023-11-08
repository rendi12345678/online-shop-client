import React, {useEffect, useState, createContext, useReducer} from 'react';
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductInfo from './pages/ProductInfo';
import './styles/navbar.css';
import './styles/reset.css';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/"
               exact
               element={<Home/>}/>
        <Route path="/product-info"
               exact
               element={<ProductInfo/>}/>
        </Routes>
    </div>
  );
}

export default App;