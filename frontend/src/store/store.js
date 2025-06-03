import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';


export const store = configureStore({
reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    },
});