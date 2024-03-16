import { Card } from "react-bootstrap";
import classes from './ExpenseForm/Expense.module.css';
import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseItem from "./ExpenseItem/ExpenseItem.jsx";
import { fetchExpenseFromDB, saveExpenseToDB} from '../../../../services/expenseService.js'
import { useDispatch, useSelector } from "react-redux";
import { expenseSliceActions } from "../../../../store/expenseSlice.js";

const Expense = () => {
    const dispatch = useDispatch();
    const expenseList_redux = useSelector((state)=>state.expense.expenseList);
    const [expenseList, setExpenseList] = useState(expenseList_redux);
    const [showForm, setShowForm] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    const total = expenseList.reduce((acc,curr)=>acc+ Number(curr.amount),0);

    const formSubmitHandler = async (expense) => {
        try{
            const methodType = expenseToEdit ? 'PUT' : 'POST'; //if item to edit is present then set method type PUT else POST
            const idToEdit = expenseToEdit ? expenseToEdit.id : null;  //for PUT get id from edit item state, else for post it will be null

            const newExpense = await saveExpenseToDB(methodType, idToEdit, expense);
            setExpenseList((oldList)=>{
                if(expenseToEdit===null)  //if expense to edit is null -> usual POST (add new expense to old list);  else PUT (update the expense data in old list)
                {
                    expense.id=newExpense.name;
                    return [...oldList, expense];
                }
                return oldList.map(item=>{
                    if(item.id===expenseToEdit.id)
                        return {...item, ...expense};
                    return item;
                })                
            });
            setExpenseToEdit(null);   //reset current state for item to edit to null
        }
        catch(err){
            alert(err.message);
        }
    }

    const deleteExpenseHandler = (id)=>{
        setExpenseList((oldExpenses) => {
            const updatedExpense = oldExpenses.filter(expense => expense.id!==id);
            return updatedExpense;
        })
    }

    const editExpenseHandler = (expense) => {
        setShowForm(true);
        setExpenseToEdit(expense);
    }

    useEffect(()=>{
        if(expenseList_redux.length===0)
            (async()=>{
                try{
                    const expenses = await fetchExpenseFromDB();
                    if(!expenses)
                        return;
                    dispatch(expenseSliceActions.setExpenseList(Object.keys(expenses).map(key=>{
                        return {id:key, ...expenses[key]}
                    })));  //redux state update
                }
                catch(err){
                    alert(err.message);
                }
            })()
    },[]);

    useEffect(()=>{
        setExpenseList(expenseList_redux);
    },[expenseList_redux])

    // console.log(expenseList);

    return (
        <Card className={classes.expense + " h-100 p-0 "}>
            <div className="w-100 shadow rounded-3">
            {
                showForm ? <ExpenseForm onFormClose={()=>{setShowForm(!showForm); setExpenseToEdit(null)}} onFormSubmit={formSubmitHandler} expenseToEdit={expenseToEdit} /> : <i onClick={()=>setShowForm(!showForm)} className="ri-add-box-fill p-0 text-success  ms-2" style={{fontSize: '3rem'}}></i>
            }
            </div>

            <div className={classes.displayContainer}>
                <div className="d-flex justify-content-between ps-2 bg-success-subtle fs-4 fw-bolder border-bottom border-4 border-dark-subtle "><span className="col-10">Total Expenses</span><span className="col-2">Rs. {total}</span></div>
                {
                    expenseList.map((expense)=>(
                        <ExpenseItem key={expense.id} data={expense} onDelete={deleteExpenseHandler} onEdit={()=>editExpenseHandler(expense)} />
                    ))
                }
            </div>
        </Card>
    )
}

export default Expense;