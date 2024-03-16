import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenseList: []};
const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers:{
        setExpenseList(state, action){
            state.expenseList = action.payload;
        }
    }
});


export const expenseSliceActions = expenseSlice.actions;

export default expenseSlice.reducer;