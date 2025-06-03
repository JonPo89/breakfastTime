import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;


export const loadProducts = createAsyncThunk(
    "products/loadProducts",
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) return thunkAPI.rejectWithValue({ error: 'Failed to load products' });
                const data = await response.json();
                return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message || 'Error connecting to server' });
        }
});

export const loadProductDetails = createAsyncThunk(
    "products/loadProductDetails",
    async (id, thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/products/id/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok){
                if (response.status === 404){
                    return thunkAPI.rejectWithValue({ error: 'Product not found' });
                }
                    return thunkAPI.rejectWithValue({ error: 'Fetching product details failed' });
            } 
            const data = await response.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message || 'Network error' });
        }
});

export const searchProducts = createAsyncThunk(
    "products/searchProducts",
        async (searchQuery) => {
        try {
            const response = await fetch(baseurl + '/products/search/' + searchQuery, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Search for products failed');
            };
            const data = await response.json();
            return data;
        }catch (err) {
            console.log('Error loading products', err);
        }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        activeProduct: [],
        searchResults: [],
        isLoading: false,
        hasError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Failed to load products';
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                    state.products = action.payload;
                    state.hasError = false;

            })
            .addCase(loadProductDetails.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
                
            })
            .addCase(loadProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.activeProduct = null;
                state.errorMessage = action.payload?.error || 'Something went wrong';
            })
            .addCase(loadProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload){
                    state.hasError = false;
                    state.activeProduct = action.payload;
                } else {
                    state.hasError = true;
                    state.errorMessage = 'Product not found'
                }
            })
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(searchProducts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.searchResults = action.payload;
            })

    }
})

export const selectProducts = (state) => state.products.products;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectSearchResults = (state) => state.products.searchResults;
export const selectActiveProduct = (state) => state.products.activeProduct;
export const selectProductsHasError = (state) => state.products.hasError;
export const selectProductErrorMessage = (state) => state.products.errorMessage;
export default productsSlice.reducer;