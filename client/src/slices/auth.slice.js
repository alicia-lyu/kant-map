import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/auth/auth.service'
import { setMessage } from './message.slice';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null }

const handleError = (error, thunkAPI) => {
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();
    thunkAPI.dispatch(setMessage(message));
    thunkAPI.rejectWithValue(message);
}

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ username, password, email }, thunkAPI) => {
        try {
            const res = await AuthService.signup(username, password, email);
            thunkAPI.dispatch(setMessage(res.data.message));
            return res.data
        } catch (error) {
            handleError(error, thunkAPI)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const res = await AuthService.login(username, password);
            thunkAPI.dispatch(setMessage(res.data.message));
            return { user: res.data }
        } catch (error) {
            handleError(error, thunkAPI)
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [signup.fulfilled]: (state, action) => {
            state.isLoggedIn = false
        },
        [signup.rejected]: (state, action) => {
            state.isLoggedIn = false
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null
        },
    }
})

export default authSlice.reducer