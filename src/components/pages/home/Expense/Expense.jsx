import { Card } from "react-bootstrap";
import classes from './ExpenseForm/Expense.module.css';
import { useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseItem from "./ExpenseItem/ExpenseItem.jsx";


const Expense = () => {
    const [showForm, setShowForm] = useState(false);
    const [expenseList, setExpenseList] = useState([]);

    const total = expenseList.reduce((acc,curr)=>acc+ Number(curr.amount),0);

    const addExpenseHandler = (expense) => {
        setExpenseList((oldList)=>{
            return [...oldList, expense];
        });
    }

    console.log(expenseList)
    return (
        <Card className={classes.expense + " h-100 p-0 "}>
            <div className="w-100 shadow rounded-3">
            {
                showForm ? <ExpenseForm onFormClose={()=>setShowForm(!showForm)} onExpenseAdd={addExpenseHandler} /> : <i onClick={()=>setShowForm(!showForm)} className="ri-add-box-fill p-0 text-success  ms-2" style={{fontSize: '3rem'}}></i>
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