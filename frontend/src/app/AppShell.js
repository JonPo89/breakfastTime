"use client";

import { useEffect } from "react";
import { SplashContext } from "./context/splashContext";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUserIsLoading, checkAuth } from "../store/userSlice";
import { selectCart, loadItemsFromCart} from '../store/cartSlice';
import {loadOrders } from '../store/orderSlice';
import { loadProducts } from "../store/productSlice";
import Header from "./components/Header";
import Banner from "./components/Banner";

export default function AppShell({ children, splashPage }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userIsLoading = useSelector(selectUserIsLoading);
  const cartItems = useSelector(selectCart);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && userIsLoading === false) {
      if (!cartItems || cartItems.length === 0) {
        dispatch(loadItemsFromCart());
        dispatch(loadOrders());
      }
    }
  }, [isLoggedIn, dispatch, userIsLoading]);

  return (
    <SplashContext.Provider value={splashPage}>
      <Header splashPage={splashPage} />
      <main>{children}</main>
      <Banner/>
    </SplashContext.Provider>
  );
}