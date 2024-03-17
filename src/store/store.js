import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';
import themeReducer from './darkModeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer,
        theme: themeReducer,
    }
});


export default store;