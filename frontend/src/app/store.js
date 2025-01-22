import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice';
import userReducer from '../features/user/userSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
