import { Card } from "react-bootstrap";
import classes from './ExpenseForm/Expense.module.css';
import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseItem from "./ExpenseItem/ExpenseItem.jsx";
import { fetchExpenseFromDB } from '../../../../services/expenseService.js'
import { useDispatch, useSelector } from "react-redux";
import { expenseSliceActions } from "../../../../store/expenseSlice.js";

const Expense = () => {
    const dispatch = useDispatch();
    const expenseState = useSelector((state)=>state.expense.expenseList);
    const expenseToEdit = useSelector((state)=>state.expense.expenseToEdit);
    const [expenseList, setExpenseList] = useState(expenseState);
    const [showForm, setShowForm] = useState(false);

    const total = expenseList.reduce((acc,curr)=>acc+ Number(curr.amount),0);

    useEffect(()=>{
        if(expenseList.length===0)
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
    },[dispatch]);

    useEffect(() => {
        setExpenseList(expenseState);
    }, [expenseState]);

    useEffect(()=>{
        if(expenseToEdit)
            setShowForm(true)
    },[expenseToEdit]);
    // console.log(expenseState);

    return (
        <Card className={classes.expense + " h-100 p-0 "}>
            <div className="w-100 shadow rounded-3">
            {
                showForm ? <ExpenseForm onFormClose={()=>{setShowForm(!showForm)}} /> : <i onClick={()=>setShowForm(!showForm)} className="ri-add-box-fill p-0 text-success  ms-2" style={{fontSize: '3rem'}}></i>
            }
            </div>

            <div className={classes.displayContainer}>
                <div className="d-flex justify-content-between ps-2 bg-success-subtle fs-4 fw-bolder border-bottom border-4 border-dark-subtle "><span className="col-10">Total Expenses</span><span className="col-2">Rs. {total}</span></div>
                {
                    expenseList.map((expense)=>(
                        <ExpenseItem key={expense.id} data={expense} />
                    ))
                }
            </div>
        </Card>
    )
}

export default Expense;