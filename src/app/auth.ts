import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const auth = createSlice({
    name: 'auth',
    initialState: '',
    reducers: {
        logIn: (state, actions) => {

        },
        logOut: (state, actions) => {

        }
    }
});

export const { logIn, logOut } = auth.actions

export default auth.reducer