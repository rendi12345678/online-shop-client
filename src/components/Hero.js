import React, {useEffect, useReducer, useContext} from 'react';
import './../styles/hero.css';
import './../styles/reset.css';
import heroImage from './../img/asus-zenbook.png';
import axios from 'axios';
import { FunctionsContext } from '../App.js';

const initialState = {
  heroProduct: {},
  loading: true,
  error: '',
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'set-hero-product':
      return {
        ...state,
        loading: false,
        heroProduct: action.payloads,
        error: ''
      }
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: 'Something went wrong!'
      }
    default:
      return state
  }
}

const Hero = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    heroProduct = {},
    error,
    loading
  } = state;
  const {
    sendDataToServerAndMovePage, 
    getImage, 
    addProductsToState,
  } = useContext(FunctionsContext);
  
  
  const renderHeroProduct = heroProduct => {
    const {id, title, image, description, price} = heroProduct;
    
      return (
        <>
        <div className="info">
          <h1>{title}</h1>
          <h3><span>Rp {price}</span></h3> 
          <p>{description}</p>
          <div className="buttons">
             <button onClick={() => sendDataToServerAndMovePage('product-info', heroProduct)}>Shop Now</button>
          </div>
        </div>
        <figure className="hero-image">
          <img src={getImage(image)} alt="Laptop"/>
        </figure>
        </>
     ); 
  }
  
  useEffect(() => {
    addProductsToState('/api/hero-product', 'set-hero-product', dispatch);
  }, []);
  
  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-container">
        {
          loading && <h3 className="loading dua">Loading...</h3>
        }
        {
          error !== '' && <h3 className="error-msg dua">{error}</h3>
        }
        {
          heroProduct && renderHeroProduct(heroProduct) 
        }
      </div>
    </section>
  );
}

export default Hero;