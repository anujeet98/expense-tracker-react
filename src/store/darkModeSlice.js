import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDarkMode: false };
const darkModeSlice = createSlice({
    name: 'darkmode',   
    initialState,
    reducers: {
        toggleMode(state){
            state.isDarkMode = !state.isDarkMode;
        },
    }
});

export const themeActions = darkModeSlice.actions;

export default darkModeSlice.reducer;