import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseurl = process.env.REACT_APP_BACKEND_URL;

export const loadOrders = createAsyncThunk(
    'loadOrders/order',
    async () => {
        try {
            const response = await fetch (baseurl + '/orders', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            return data;

        } catch (err) {
            console.log('Error loading orders', err);
        }
});

export const placeOrder = createAsyncThunk(
    'placeOrder/order',
    async () => {
        try {
            const response = await fetch (baseurl + '/orders', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            
            });
            if (!response.ok) {
                throw new Error('Failed to place order');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error placing order: ', err);
        }
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        orderNumber: null,
        hasError: false,
        isLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrders.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.orders = action.payload;
            })
            .addCase(loadOrders.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.orderNumber = action.payload;
            })
            .addCase(placeOrder.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
})

export const selectOrders = (state) => state.order.orders;
export const selectOrderNumber = (state) => state.order.orderNumber;
export default orderSlice.reducer;