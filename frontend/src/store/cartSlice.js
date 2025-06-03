import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addProductToCart = createAsyncThunk(
    'addProductToCart/cart',
    async (productid, thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/cart/' + productid, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) return thunkAPI.rejectWithValue({ error: 'Failed to add product to cart' });
            const data = await response.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message || 'Error connecting to server' });
        }
}); 

export const removeProductFromCart = createAsyncThunk(
    'removeProductFromCart/cart',
    async (productId, thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/cart/' + productId, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) return thunkAPI.rejectWithValue({error: 'Failed to remove product from cart'});
            const data = await response.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({error: err.message || 'Error connecting to server'})
        }
});

export const overRideCart = createAsyncThunk(
    'overRideCart/cart',
    async (cartItems, thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/cart/override', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    cartItems: cartItems.map((item) => {
                        return {
                            product_id: item.product_id,
                            quantity: item.quantity,
                        }
                    })
                }),
            });
            if (!response.ok) return thunkAPI.rejectWithValue({error: 'Failed to override cart'})
            const data = await response.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message || 'Error connecting to server' });
        }
});

export const loadItemsFromCart = createAsyncThunk(
    'loadItemsFromCart/cart',
    async (thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/cart', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json'},

            })
            if (!response.ok) return thunkAPI.rejectWithValue({error: 'Failed to load items from cart'})
            const data = await response.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({error: err.message || 'Error connecting to server'})
        }
});

export const clearItemFromCart = createAsyncThunk(
    'clearItemFromCart/cart',
    async (productId, thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/cart/clear/' + productId, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json'},
            })
            if (!response.ok) return thunkAPI.rejectWithValue({error: 'Failed to clear item from cart'})
            const data = await response.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({error: err.message || 'Error connecting to server'});
        }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isLoading: false,
        hasError: false,
        errorMessage: null
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(addProductToCart.rejected, (state,action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Failed to add product to cart';
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                if (!state.items){
                    state.items = [];
                }
                let cartLocation = state.items.findIndex(item => item.product_id === action.payload.product_id);
                if (cartLocation !== -1) {
                    state.items[cartLocation].quantity ++;
                } else {
                    state.items = [...state.items, action.payload];
                }
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                let cartLocation = state.items.findIndex(item => item.product_id === action.payload.productId);
                if (cartLocation !== -1) {
                    if (state.items[cartLocation].quantity > 1){
                        state.items[cartLocation].quantity --
                    } else {
                        state.items.splice(cartLocation, 1);
                    }
                }
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Failed to remove product from cart'
            })
            .addCase(overRideCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(overRideCart.rejected, (state,action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Failed to override cart'
            })
            .addCase(overRideCart.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(loadItemsFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.items = action.payload;
            })
            .addCase(loadItemsFromCart.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(loadItemsFromCart.rejected, (state,action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Failed to load items from cart'
            })
            .addCase(clearItemFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                let cartLocation = state.items.findIndex(item => item.productId === action.productId);
                if (cartLocation !== -1){
                    state.items.splice(cartLocation, 1);
                }
            })
            .addCase(clearItemFromCart.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(clearItemFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Failed to clear item from cart'
            })
    }
})

export const selectCart = (state) => state.cart.items;
export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;