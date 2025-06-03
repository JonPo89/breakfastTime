import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (thunkAPI) => {
        try {
            const response = await fetch(baseurl + '/auth', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) return thunkAPI.rejectWithValue({error: 'Failed to connect to server'})
            const data = await response.json();
            return data;

        } catch(err) {
            return thunkAPI.rejectWithValue({error: 'Failed to connect to server'})
        }
});

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ( {username, password}, { rejectWithValue } ) => {
        try {
            const lowercaseUsername = username.toLowerCase();
            const response = await fetch(baseurl + '/user/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({
                    username: lowercaseUsername, 
                    password: password}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error);
                console.log('Error: ' + errorData.error);
                return rejectWithValue(errorData)
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error signing in' + err.message);
            return rejectWithValue({error: 'Error signing in'});

        }
    }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async ({ username, name, password, email }, { rejectWithValue }) => {
        try {
            const response = await fetch(baseurl + '/user/createuser', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, name, password, email }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error);
                console.log('Error: ' + errorData.error);
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (err) {
            console.log('Error creating user: ' + err.message);
            return rejectWithValue({ error: 'Failed to create user. Please try again.' });
        }
    }
);


export const signout = createAsyncThunk(
    'user/signout',
    async () => {
        try {
            const response = await fetch(baseurl + '/user/signout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) throw new Error('Could not sign out');
            const data = await response.json();
            return data;
        }catch (err) {
            console.log('Error signing out' + err);
        }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        profile: {},
        hasError: false,
        isLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(checkAuth.rejected, (state,action) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Error connecting to server';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                if (action.payload && action.payload.user) {
                    state.profile = action.payload.user;
                    state.isLoggedIn = true;
                } else {
                    state.isLoggedIn = false;
                    state.profile = {};
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = null;
            })
            .addCase(loginUser.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
                state.errorMessage = action.payload?.error || 'Error logging in'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.isLoggedIn = true;
                state.profile = action.payload.user;
            })
            .addCase(createUser.pending, (state) => {
                state.hasError = false;
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(createUser.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.errorMessage = action.payload?.error || 'Error creating user'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.isLoggedIn = true;
                state.profile = action.payload.user;
            })
            .addCase(signout.pending, (state) => {
                state.hasError = false;
                state.isLoading = true;
                state.isLoggedIn = false;
                state.errorMessage = null;
            })
            .addCase(signout.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.isLoggedIn = false;
            })
            .addCase(signout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.isLoggedIn = false;
                state.profile = {};
            })
    }
})

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserIsLoading = (state) => state.user.isLoading;
export const selectUser = (state) => state.user.profile;
export const selectServerError = (state) => state.user.errorMessage;

export default userSlice.reducer;