import { createSlice } from '@reduxjs/toolkit';



const initialState = { isLoggedIn: false, userData: null, token: null, premium: null, premiumEligible: false };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateProfile(state, action){
            state.userData = action.payload;
        },
        login(state, action){
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
            state.userData = null;
        },
        setPremiumStatus(state, action){
            state.premium = true;
        },
        setPremiumEligible(state){
            state.premiumEligible= true;
        }
    }
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;