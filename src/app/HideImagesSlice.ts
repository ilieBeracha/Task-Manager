import { createSlice } from '@reduxjs/toolkit'

const HideImagesSlice = createSlice({
    name: 'hideImages',
    initialState: false,
    reducers: {
        showOrHide: (state) => {
            return state = !state
        }
    }
});

export const { showOrHide } = HideImagesSlice.actions

export default HideImagesSlice.reducer