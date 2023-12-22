import React, { useEffect, useState, createContext, useReducer } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';

  // const serverUrl = 'https://lovely-tan-dove.cyclic.app';
  const serverUrl = 'http://localhost:5000';
  
  export const addProductsToState = async (endpoint, type, dispatch) => {
    const response = await getProducts(endpoint);
    
    if(response === 'FETCH_ERROR') {
      dispatch({type: 'FETCH_ERROR'});
    } 
      
    if(response.length !== 0) {
      dispatch({type: type, payloads: response})
    }
      
    console.log(response)
  }
  
  export const getProducts = async endpoint => {
    try {
      const response = await axios.get(`${serverUrl}${endpoint}`);
      
      return response.data.productData;
    } catch(err) {
      console.log('gagall')
      return 'FETCH_ERROR';
    }
  }
  
  export const getImage = image => `/img/${image}`;