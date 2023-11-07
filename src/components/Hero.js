import React, {useEffect, useReducer} from 'react';
import './../styles/hero.css';
import './../styles/reset.css';
import heroImage from './../img/asus-zenbook.png';
import axios from 'axios';

const initialState = {
  heroProduct: {},
  loading: true,
  error: '',
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'set-hero-product':
      return {
        loading: false,
        heroProduct: action.payload,
        error: ''
      }
    case "FETCH_ERROR":
      return {
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
    heroProduct,
    error,
    loading
  } = state;
  const serverUrl = 'https://lovely-tan-dove.cyclic.app';
  
  const renderHeroProduct = ({id, title, image, description, price}) => {
    if(heroProduct != null) {
      if(heroProduct) {
        return (
        <>
        <div className="info">
          <h1>{title}</h1>
          <h3><span>Rp {price}</span></h3> 
          <p>{description}</p>
          <div className="buttons">
             <button>Shop Now</button>
          </div>
        </div>
        <figure className="hero-image">
          <img src={getImage(image)} alt="Laptop"/>
        </figure>
        </>
        );
      }
    }
  }
  
  const getImage = image => `/img/${image}`;
  
  useEffect(() => {
    axios.get(`${serverUrl}/api/hero-product`)
    .then(res => {
      console.log(res.data)
      dispatch({type: 'set-hero-product', payload: res.data});
    })
    .catch(error => {
      dispatch({type: 'FETCH_ERROR'});
    });
  }, []);
  
  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-container">
        {
          loading && (
           <h3 className="loading-product">Loading...</h3>
          )
        }
        {
          error !== '' && <h3 className="error-msg loading-product">{error}</h3>
        }
        {
          heroProduct.productData ? renderHeroProduct(heroProduct.productData) : null
        }
      </div>
    </section>
  );
}

export default Hero;