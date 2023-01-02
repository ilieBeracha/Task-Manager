import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = window.localStorage.getItem('token');
let initialState = null;

if (token) {
    const { username, sub } = jwtDecode<{ username: string, sub: number }>(token);
    initialState = {username, sub};
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            const { username, sub } = jwtDecode<{ username: string, sub: number }>(action.payload);
            state = {username, sub};
            console.log(state)
            window.localStorage.setItem('token', action.payload);
            return state;
        },
        logout: (state) => {
            window.localStorage.removeItem(`token`);
            return null;
        },
        
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
