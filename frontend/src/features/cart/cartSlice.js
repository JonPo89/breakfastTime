import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseurl = process.env.REACT_APP_BACKEND_URL;

export const addProductToCart = createAsyncThunk(
    'addProductToCart/cart',
    async (productid) => {
        try {
            const response = await fetch(baseurl + '/cart/' + productid, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) throw new Error('Adding product to cart failed');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error adding product to cart', err);
        }
}); 

export const removeProductFromCart = createAsyncThunk(
    'removeProductFromCart/cart',
    async (productId) => {
        try {
            const response = await fetch(baseurl + '/cart/' + productId, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Removing product from cart failed');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error removing product from cart', err);
        }
});

export const overRideCart = createAsyncThunk(
    'overRideCart/cart',
    async (cartItems) => {
        try {
            console.log(cartItems);
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
            if (!response.ok) throw new Error('Overriding cart failed');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error overriding cart', err);
        }
});

export const loadItemsFromCart = createAsyncThunk(
    'loadItemsFromCart/cart',
    async () => {
        try {
            const response = await fetch(baseurl + '/cart', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json'},

            })
            if (!response.ok) throw new Error('Loading cart failed');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error loading items from cart', err);
        }
});

export const clearItemFromCart = createAsyncThunk(
    'clearItemFromCart/cart',
    async (productId) => {
        try {
            const response = await fetch(baseurl + '/cart/clear/' + productId, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json'},
            })
            if (!response.ok) throw new Error('Clearing cart item failed');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error clearing item from cart', err);
        }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isLoading: false,
        hasError: false
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
            })
            .addCase(addProductToCart.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
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
                let cartLocation = state.items.findIndex(item => item.productId === action.payload.product_id);
                console.log(cartLocation);
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
            })
            .addCase(removeProductFromCart.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(overRideCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(overRideCart.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(overRideCart.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadItemsFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.items = action.payload;
            })
            .addCase(loadItemsFromCart.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadItemsFromCart.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
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
            })
            .addCase(clearItemFromCart.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
})

export const selectCart = (state) => state.cart.items;
export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;