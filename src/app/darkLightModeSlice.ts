import { createSlice } from '@reduxjs/toolkit'


const darkLightModeSlice = createSlice({
    name: 'mode',
    initialState: false,
    reducers: {
        darkLightModeReducer: (state) => {
            return state = !state
        }
    }
});

export const { darkLightModeReducer } = darkLightModeSlice.actions

export default darkLightModeSlice.reducer