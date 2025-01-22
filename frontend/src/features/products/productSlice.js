import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseurl = process.env.REACT_APP_BACKEND_URL;


export const loadProducts = createAsyncThunk(
    "products/loadProducts",
    async () => {
        try {
            const response = await fetch(baseurl + '/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Fetching products failed');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error loading products list', err);
        }
});

export const loadProductDetails = createAsyncThunk(
    "products/loadProductDetails",
    async (id) => {
        try {
            const response = await fetch(baseurl + '/products/id/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Fetching product details failed');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error loading product', err);
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
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadProducts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.products = action.payload;
            })
            .addCase(loadProductDetails.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadProductDetails.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(loadProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.activeProduct = action.payload;
            })
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
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
export default productsSlice.reducer;