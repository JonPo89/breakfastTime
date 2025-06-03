import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const loadOrders = createAsyncThunk(
    'loadOrders/order',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch (baseurl + '/orders', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: 'Issue fetching orders.' });
            }
            const data = await response.json();
            return data;

        } catch (err) {
            return thunkAPI.rejectWithValue({error: err.message || 'Network error'});
        }
});

export const placeOrder = createAsyncThunk(
    'placeOrder/order',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch (baseurl + '/orders', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            
            });
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: 'Error placing order.' });
            }
            const data = await response.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({error: err.message || 'Network error'});
        }
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        orderNumber: null,
        hasError: false,
        isLoading: false,
        errorMessage: null
    },
    reducers:{
        clearOrders: (state) => {
            state.orders = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrders.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(loadOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.orders = action.payload;
            })
            .addCase(loadOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Problem loading orders';
            })
            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.orderNumber = action.payload;
            })
            .addCase(placeOrder.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Error placing order';
            })
    }
})

export const selectOrders = (state) => state.order.orders;
export const selectOrderNumber = (state) => state.order.orderNumber;
export const selectOrderErrorMessage = (state) => state.order.errorMessage;
export const {clearOrders} = orderSlice.actions;
export default orderSlice.reducer;