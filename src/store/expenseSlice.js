import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenseList: [], expenseToEdit: null};
const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers:{
        setExpenseList(state, action){
            state.expenseList = action.payload;
        },
        deleteExpense(state, action){
            state.expenseList = state.expenseList.filter(expense => expense.id!==action.payload);
        },
        addExpense(state, action){
            state.expenseList.push(action.payload);
        },
        editExpense(state, action){
            state.expenseList = state.expenseList.map(item=>{
                if(item.id===action.payload.id)
                    return {...action.payload};
                return item;
            })
        },
        setExpenseToEdit(state, action){
            state.expenseToEdit = state.expenseList.filter(expense => expense.id === action.payload)[0];
        },
        unsetExpenseToEdit(state){
            state.expenseToEdit = null;
        }
    }
});


export const expenseSliceActions = expenseSlice.actions;

export default expenseSlice.reducer;