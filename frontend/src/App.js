
import './App.css';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {Header} from './features/header/Header.js';
import {Cart} from './features/cart/Cart';
import {User} from './features/user/User.js';
import {Products} from './features/products/Products.js';
import { ProductPage } from './features/productPage/ProductPage.js';
import {Home} from './features/home/Home.js';
import {About} from './features/about/About.js';
import { CreateUser } from './features/createUser/CreateUser.js';
import { Login } from './features/login/Login.js';
import { Orders } from './features/orders/Orders.js';
import { OrderComplete } from './features/orders/OrderComplete.js';
import { loadProducts } from './features/products/productSlice.js';
import { checkAuth, selectIsLoggedIn } from './features/user/userSlice.js';
import { loadItemsFromCart, selectCart } from './features/cart/cartSlice.js';
import { loadOrders } from './features/orders/orderSlice.js';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartItems = useSelector(selectCart);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadProducts());
  }, [ dispatch]);

  useEffect(() => {

    if (isLoggedIn) {
      if (!cartItems || cartItems.length === 0){
        dispatch(loadItemsFromCart())
        dispatch(loadOrders());
      }
    }
  }, [isLoggedIn, cartItems, dispatch])
  

  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductPage/>} />
          <Route path="/cart" element={<Cart />}  />
            <Route path="/orderComplete" element={<OrderComplete/>} />
          <Route path="/user" element={<User />} />
            <Route path="/user/login" element={isLoggedIn ? <Navigate to='/user' /> : <Login />}/>
            <Route path="/user/createUser" element={isLoggedIn ? <Navigate to="/user" /> : <CreateUser />}/>
            <Route path="/user/orders" element={!isLoggedIn ? <Navigate to='/user' /> : <Orders />} />
        </Routes>

      </Router>  
    </div>
  );
}

export default App;
