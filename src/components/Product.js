import React, {useReducer, useEffect, useContext} from 'react';
import image from '../img/asus-zenbook.png';
import axios from 'axios';
import { FunctionsContext } from '../App.js';

const initialState = {
  count: 0,
  products: [],
  error: '',
  loading: true,
  productInfo: [],
  error2: '',
  infoLoading: true
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1
      }
    case 'decrement':
      return {
        ...state,
        count: (state.count - 1) < 0 ? 0 : state.count - 1
      }
    case 'set-products':
      return {
        ...state,
        products: action.payload
      }
    case 'set-product-info': 
      return {
        ...state,
        productInfo: action.payload
      }
    case 'set-loading':
      return {
        ...state,
        loading: action.loadingValue
      }
    case 'set-info-loading':
      return {
        ...state,
        infoLoading: action.loadingValue
      }
    case 'set-error': 
      return {
         ...state,
         error: action.errorData
      }
    case 'set-error2': 
      return {
         ...state,
         error2: action.errorData
      }
    default:
     return {
       state
     };
  }
}

const Product = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, products = [], productInfo = [], loading, error, infoLoading, error2 } = state;
  const {sendDataToServerAndMovePage, getImage, serverUrl} = useContext(FunctionsContext);
  
  const addDataToState = (url, action) => {
    axios.get(url)
    .then(res => {
      const data = res.data.productData;
      
      successResponse(action, data);
    })
    .catch(err => {
      const errorMsg = 'Failed fetching data!';
      
      errorResponse(action, errorMsg);
    });
  }
  
  const successResponse = (action, data) => {
    if(action === "set-product-info") {
        dispatch({type: 'set-product-info', payload: data});
        dispatch({type: 'set-error', errorData: ''});
        dispatch({type: 'set-info-loading', loadingValue: false});
      } else {
        dispatch({type: 'set-products', payload: data});
        dispatch({type: 'set-error2', errorData: ''});
        dispatch({type: 'set-loading', loadingValue: false});
      }
  }
  
  const errorResponse = (action, errorMsg) => {
    if(action === 'set-product-info') {
        dispatch({type: 'set-error', errorData: errorMsg});
        dispatch({type: 'set-info-loading', loadingValue: false});
      } else {
        dispatch({type: 'set-error2', errorData: errorMsg});
        dispatch({type: 'set-loading', loadingValue: false});
      }
  }
  
  const fetchData = () => {
    addDataToState(`${serverUrl}/api/product-info`, 'set-product-info');
    addDataToState(`${serverUrl}/api/you-might-also-like-products`, 'set-product');
    
    console.log('render');
  }
  
  useEffect(() => {
    fetchData();
    
    console.log('render useEffect')
    console.log(loading)
  }, []);   
  
  return (
  <>
    <section className="product">
    {
      (productInfo.length !== 0 && infoLoading === false) && productInfo.map(({image, title, price, id, description}) => (
        <React.Fragment key={id}>
      <div className="product-images">
       <img src={getImage(image)}
            alt="laptop"
            className="main-image"/>
       <figure className="other-images">
         <img src={getImage(image)}  
              alt="laptop"/>
         <img src={getImage(image)}
              alt="laptop"/>
         <img src={getImage(image)}
              alt="laptop"/>
       </figure>
     </div>
     <div className="product-info">
       <h1>{title}</h1>
       <h3>Rp {price}</h3>
       <p>{description}</p>
       <div className="buttons">
         <div className="counter">
           <button className="decrement"
                   onClick={() => dispatch({type: 'decrement'})}>-</button>
           <p className="count">{count}</p>
           <button className="increment"
                   onClick={() => dispatch({type: 'increment'})}>+</button>
         </div>
         <button className="add-to-cart-btn"
                 onClick={() => sendDataToServerAndMovePage('cart', {image, title, price, id, description, count})}>Add To Cart</button>
       </div>
     </div>
        </React.Fragment>
      ))
    }
    {
      error !== '' && <h3 className="error-msg">{error}</h3>
    }
    {
     infoLoading && <h3 className="loading">Loading...</h3>  
    }
    </section>
     <section className="you-might-also-like">
      <h2>You Might Also Like</h2>
      <div className="card-list">
    {
      error2 !== '' && <h3 className="error-msg dua">{error2}</h3>
    }
    {
      loading && <h3 className="loading dua">Loading...</h3>  
    }
        {
          products.length !== 0 && products.map(({id, title, price, image, description}) => (
       <div className="card" 
            key={id} 
            onClick={() => sendDataToServerAndMovePage('product-info', {id, image, title, description, price})}>
        <figure className="card-image" style={{
          background: `url(${getImage(image)}) center / 50% no-repeat #eee`,
        }}></figure>
        <div className="card-info">
          <h3 className="title">{title}</h3>
          <p className="price">Rp {price}</p>
        </div>
       </div>
       )) 
        }
      </div>
    </section>
  </>
  );
}

export default Product;