import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthState } from "../../types/user";

const BASE_URL = 'http://localhost:3000/';

const loadInitialState = (): AuthState => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return {
        token: token ? token : null,
        user: user ? JSON.parse(user) : null,
        loading: false,
        error: null,
    };
};

const initialState: AuthState = loadInitialState();

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { usernameOrEmail: string; password: string }, { rejectWithValue }) => {
        try {
            const isEmail = credentials.usernameOrEmail.includes('@');

            const payload = isEmail
                ? { email: credentials.usernameOrEmail, password: credentials.password }
                : { username: credentials.usernameOrEmail, password: credentials.password };

            const response = await axios.post(`${BASE_URL}users/login`, payload);

            return response.data;
        } catch (error) {
            return rejectWithValue((error as any).response.data);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        initializeAuth(state) {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');



            if (token && user) {

                try {
                    const decodedToken = jwtDecode(token);
                    const curTime = Date.now() / 1000;

                    if (decodedToken.exp && decodedToken.exp > curTime) {

                        state.token = token;
                        state.user = JSON.parse(user);
                    } else {
                        state.token = null;
                        state.user = null;
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        console.log("Token expired");

                    }
                } catch (error) {
                    state.token = null;
                    state.user = null;
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    console.log("Invalid token removed");
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;

                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
    }
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;