import React, {useReducer, useRef, useEffect, useContext} from 'react';
import './../styles/our-product.css';
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';

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
    case "set-onsale":
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
  const serverUrl = 'https://lovely-tan-dove.cyclic.app';
  
  const getImage = image => `/img/${image}`;
  
  const renderCards = ({image, title, price, id, description}) => {
    return (
      <div className="card"
           key={id}
           onClick={() => sendDataToServer({id, image, title, description, price})}>
        <a className="card-image" 
           href="/product-info"
           style={{
          background: `url(${getImage(image)}) center / 70% no-repeat #eee`
        }}>
        </a>
        <div className="card-info">
          <h3 className="title">{title}</h3>
          <p className="price">Rp {price}</p>
        </div>
      </div>
    );
  }
  
  const setProducts = category => {
    if(category === 'new-products') {
      dispatch({type: "set-loading", loading: true})
      newProductsRef.current.classList.add('selected');
      onsaleRef.current.classList.remove('selected');
      featureProductsRef.current.classList.remove('selected');
      
        axios.get(`${serverUrl}/api/new-products`)
    .then(res => {
      dispatch({type: 'set-new-products', payloads: res.data})
    })
    .catch(error => {
      dispatch({type: 'FETCH_ERROR'})
    });
    }
    
    if(category === 'onsale') {
      dispatch({type: "set-loading", loading: true})
      onsaleRef.current.classList.add('selected');
      newProductsRef.current.classList.remove('selected');
      featureProductsRef.current.classList.remove('selected');
      axios.get(`${serverUrl}/api/onsale`)
    .then(res => {
      console.log(res.data)
      dispatch({type: 'set-new-products', payloads: res.data});
    })
    .catch(error => {
      dispatch({type: 'FETCH_ERROR'})
    });
    }
    
    if(category === 'feature-products') {
      dispatch({type: "set-loading", loading: true})
      featureProductsRef.current.classList.add('selected');
      onsaleRef.current.classList.remove('selected');
      newProductsRef.current.classList.remove('selected');
      
        axios.get(`${serverUrl}/api/feature-products`)
    .then(res => {
      dispatch({type: 'set-new-products', payloads: res.data});
    })
    .catch(error => {
      dispatch({type: 'FETCH_ERROR'})
    });
    }
  }
  
  const sendDataToServer = ({id, title, image, description, price}) => {
    console.log('send data to server')
    const url = `${serverUrl}/api/product-info`;
    
    axios.post(url, {
      title,
      id,
      image,
      description,
      price
    })
    .then(res => {
      console.log(res.data.msg);
    })
    .then(err => {
      console.log('Failed send data to server!');
    });
    
    console.log(title)
  }

  useEffect(() => {
    setProducts('new-products');
  }, [])
  
  return (
    <section className="our-product">
      <div className="categories">
        <h4 className="new-products selected"
            ref={newProductsRef}
            onClick={() => setProducts('new-products')}>New Products</h4>
        <h4 className="onsale" 
            ref={onsaleRef}  
            onClick={() => setProducts('onsale')}>Onsale</h4>
        <h4 className="feature-products"
            ref={featureProductsRef}
            onClick={() => setProducts('feature-products')}>Feature Products</h4>
      </div>
      <div className="card-list" ref={cardListRef}>
        {
          (selectedCategory === 'new-products' && newProducts.productData) ? newProducts.productData.map(product => {
            return renderCards(product);
          }) : null
        }
        {
          (selectedCategory === 'onsale' && onsale.productData) ? onsale.productData.map(product => {
            return renderCards(product);
          }) : null
        }
        {
          (selectedCategory === 'feature-products' && featureProducts.productData) ? featureProducts.productData.map(product => {
            return renderCards(product);
          }) : null
        }
      </div>
        {
          loading && <h3>Loading...</h3>
        }
        {
          error !== '' && <h3 className="error-msg">{error}</h3>
        }
    </section>
  );
}

export default OurProduct;