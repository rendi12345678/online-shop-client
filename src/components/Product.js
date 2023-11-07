import React, {useReducer, useEffect, useContext} from 'react';
import image from '../img/asus-zenbook.png';
import axios from 'axios';

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
        products: action.payload,
        loading: false,
        error: '',
        infoLoading: false
      }
    case 'set-product-info': 
      return {
        ...state,
        productInfo: action.payload,
        loading: false,
        error: '',
        infoLoading: false
      }
    case 'set-loading':
      return {
        ...state,
        loading: action.loading
      }
    case 'set-info-loading':
      return {
        ...state,
        infoLoading: action.loading
      }
    case 'set-error2': 
      return {
         ...state,
         infoLoading: false,
         loading: false,
         error2: action.errorData
      }
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.errorData,
        infoLoading: false
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
  const serverUrl = 'https://lovely-tan-dove.cyclic.app';
  
  const getImage = image => `/img/${image}`;
  
  const getDataFromServerAndSetDataToState = (url, action) => {
    axios.get(url)
    .then(res => {
      const data = res.data.productData;
      
      console.log(data)
      
      dispatch({type: 'set-product-info', payload: data});
    })
    .catch(err => {
      const errorMsg = 'Failed fetching data!';
      
      alert(errorMsg)
      dispatch({type: 'set-error', errorData: errorMsg});
      dispatch({type: 'set-error2', errorData: errorMsg});
    });
  }
  
  const fetchData = () => {
   getDataFromServerAndSetDataToState(`${serverUrl}/api/product-info`, 'set-product-info');
    getDataFromServerAndSetDataToState(`${serverUrl}/api/you-might-also-like-products`, 'set-product');
    
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
      (productInfo.length !== 0 && infoLoading === false) && productInfo.map(product => (
        <React.Fragment key={product.id}>
      <div className="product-images">
       <img src={getImage(product.image)}
            alt="laptop"
            className="main-image"/>
       <figure className="other-images">
         <img src={getImage(product.image)}  
              alt="laptop"/>
         <img src={getImage(product.image)}
              alt="laptop"/>
         <img src={getImage(product.image)}
              alt="laptop"/>
       </figure>
     </div>
     <div className="product-info">
       <h1>{product.title}</h1>
       <h3>Rp {product.price}</h3>
       <p>{product.description}</p>
       <div className="buttons">
         <div className="counter">
           <button className="decrement"
                   onClick={() => dispatch({type: 'decrement'})}>-</button>
           <p className="count">{count}</p>
           <button className="increment"
                   onClick={() => dispatch({type: 'increment'})}>+</button>
         </div>
         <button className="add-to-cart-btn">Add To Cart</button>
       </div>
     </div>
        </React.Fragment>
      )) 
    }
    </section>
     <section className="you-might-also-like">
        {
          products.length === 0 ? <h3 className="empty-msg">Product is empty...</h3> : <h2>You Might Also Like</h2>
        }
      <div className="card-list">
        {
          products.length !== 0 && products.map(({id, title, price, image}) => (
       <div className="card" key={id}>
        <figure className="card-image" style={{
          background: `url(${getImage(image)}) center / 70% no-repeat #eee`
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