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
    serverUrl,
    getProducts,
    addProductsToState
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
  
  const addNewProducts = () => {
   dispatch({type: "set-loading", loading: true})
   setClasslist([
        {
          element: newProductsRef, 
          className: 'selected',
          action: 'add'
        }, 
        {
          element: onsaleRef, 
          className: 'selected',
          action: 'remove'
        },
        {
          element: featureProductsRef,
          className: 'selected',
          action: 'remove'
        }]); 
      
      addProductsToState('/api/new-products', 'set-new-products', dispatch);
  }
  
  const addOnsaleProducts = () => {
    dispatch({type: "set-loading", loading: true});
    setClasslist([
        {
          element: newProductsRef, 
          className: 'selected',
          action: 'remove'
        }, 
        {
          element: onsaleRef, 
          className: 'selected',
          action: 'add'
        },
        {
          element: featureProductsRef,
          className: 'selected',
          action: 'remove'
        }]);
      
      
      addProductsToState('/api/onsale', 'set-onsale-products', dispatch);
  }
  
  const addFeatureProducts = () => {
    dispatch({type: "set-loading", loading: true})
    setClasslist([
        {
          element: newProductsRef, 
          className: 'selected',
          action: 'remove'
        }, 
        {
          element: onsaleRef, 
          className: 'selected',
          action: 'remove'
        },
        {
          element: featureProductsRef,
          className: 'selected',
          action: 'add'
        }]);
      
      addProductsToState('/api/feature-products', 'set-feature-products', dispatch);
  }
  
  const setClasslist = refs => {
    refs.map(({element, className, action}) => {
     if(action === "add") {
       addClasslist(element, className);
     }
    
     if(action === "remove") {
       removeClasslist(element, className);
     }
    });
  }
  
  const addClasslist = (element, className) => {
    element.current.classList.add(className);
  }
  
  const removeClasslist = (element, className) => {
    element.current.classList.remove(className);
  }
  
  const renderCards = ({image, title, price, id, description}) => {
    return (
      <div className="card"
           key={id}
           onClick={() => sendDataToServerAndMovePage('product-info', {id, image, title, description, price})}>
        <figure className="card-image" 
           style={{
          background: `url(${getImage(image)}) center / 50% no-repeat #eee`,
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