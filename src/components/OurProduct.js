import React, {useReducer, useRef, useEffect, useContext} from 'react';
import './../styles/our-product.css';
import axios from 'axios';
import { FunctionsContext } from '../App.js';

const initialState = {
  newProducts: [],
  onsale: [],
  featureProducts: [],
  loading: true,
  error: '',
  selectedCategory: 'new-products'
}

const reducer = (state, action) => {
  switch(action.type) {
    case "set-new-products":
      return {
        newProducts: action.payloads,
        loading: false,
        error: '',
        selectedCategory: 'new-products'
      }
    case "set-onsale-products":
      return {
        onsale: action.payloads,
        loading: false,
        error: '',
        selectedCategory: 'onsale'
      }
    case "set-feature-products":
      return {
        featureProducts: action.payloads,
        loading: false,
        error: '',
        selectedCategory: 'feature-products'
      }
    case 'set-loading':
      return {
        loading: action.loading
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

const OurProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    newProducts,
    onsale, 
    featureProducts,
    selectedCategory,
    error,
    loading
  } = state;
  const cardListRef = useRef();
  const newProductsRef = useRef();
  const onsaleRef = useRef();
  const featureProductsRef = useRef();
  const {
    sendDataToServerAndMovePage, 
    getImage, 
    serverUrl
  } = useContext(FunctionsContext);
  
  const addProducts = category => {
    if(category === 'new-products') {
      addNewProducts();
    }
    
    if(category === 'onsale') {
      addOnsaleProducts();
    }
    
    if(category === 'feature-products') {
      addFeatureProducts();
    }
  }
  
  const setState = (response, type) => {
    if(response === 'FETCH_ERROR') {
        dispatch({type: 'FETCH_ERROR'});
      } 
      
      if(response.length !== 0) {
        dispatch({type: type, payloads: response})
      }
  }
  
  const getProducts = async endpoint => {
    try {
      const response = await axios.get(`${serverUrl}${endpoint}`);
      
      return response.data.productData;
    } catch(err) {
      return 'FETCH_ERROR';
    }
  }
  
  const addNewProducts = async () => {
    dispatch({type: "set-loading", loading: true})
      newProductsRef.current.classList.add('selected');
      onsaleRef.current.classList.remove('selected');
      featureProductsRef.current.classList.remove('selected');
      
      const response = await getProducts('/api/new-products');
      
      setState(response, 'set-new-products');
  }
  
  const addOnsaleProducts = async () => {
    dispatch({type: "set-loading", loading: true})
      onsaleRef.current.classList.add('selected');
      newProductsRef.current.classList.remove('selected');
      featureProductsRef.current.classList.remove('selected');
      
      const response = await getProducts('/api/onsale');
      
      setState(response, 'set-onsale-products');
  }
  
  const addFeatureProducts = async () => {
    dispatch({type: "set-loading", loading: true})
      featureProductsRef.current.classList.add('selected');
      onsaleRef.current.classList.remove('selected');
      newProductsRef.current.classList.remove('selected');
      
      const response = await getProducts('/api/feature-products');
      
      setState(response, 'set-feature-products');
  }
  
  const renderCards = ({image, title, price, id, description}) => {
    return (
      <div className="card"
           key={id}
           onClick={() => sendDataToServerAndMovePage('product-info', {id, image, title, description, price})}>
        <figure className="card-image" 
           style={{
          background: `url(${getImage(image)}) center / 70% no-repeat #eee`
        }}>
        </figure>
        <div className="card-info">
          <h3 className="title">{title}</h3>
          <p className="price">Rp {price}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    addProducts('new-products');
  }, [])
  
  return (
    <section className="our-product">
      <div className="categories">
        <h4 className="new-products selected"
            ref={newProductsRef}
            onClick={() => addProducts('new-products')}>New Products</h4>
        <h4 className="onsale" 
            ref={onsaleRef}  
            onClick={() => addProducts('onsale')}>Onsale</h4>
        <h4 className="feature-products"
            ref={featureProductsRef}
            onClick={() => addProducts('feature-products')}>Feature Products</h4>
      </div>
      <div className="card-list" ref={cardListRef}>
        {
          (selectedCategory === 'new-products' && newProducts) ? newProducts.map(product => {
            return renderCards(product);
          }) : null
        }
        {
          (selectedCategory === 'onsale' && onsale) ? onsale.map(product => {
            return renderCards(product);
          }) : null
        }
        {
          (selectedCategory === 'feature-products' && featureProducts) ? featureProducts.map(product => {
            return renderCards(product);
          }) : null
        }
      </div>
        {
          loading && <h3>Loading...</h3>
        }
        {
          error !== '' && <h3 className="error-msg dua">{error}</h3>
        }
    </section>
  );
}

export default OurProduct;