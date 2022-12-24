import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'logged',
    initialState: false,
    reducers: {
        ifUser: (state, actions) => {
            return state = actions.payload
        }
    }
});

export const { ifUser } = usersSlice.actions

export default usersSlice.reducer