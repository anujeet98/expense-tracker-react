import { Card } from "react-bootstrap";
import classes from './ExpenseForm/Expense.module.css';
import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseItem from "./ExpenseItem/ExpenseItem.jsx";

const fetchExpenseFromDB = async () => {
    try{
        const res = await fetch('https://expense-tracker-6d78c-default-rtdb.firebaseio.com/expense.json');
        const resData = await res.json();
        if(!res.ok)
            throw new Error('something went wrong..');
        return resData;
    }
    catch(err){
        throw err;
    }
}

const addExpenseToDB = async(expenseObj) => {
    try{
        const res = await fetch('https://expense-tracker-6d78c-default-rtdb.firebaseio.com/expense.json',{
            method:'POST',
            body:JSON.stringify(expenseObj),
            headers:{'Content-Type':'Application/json'},
        });
        const resData = await res.json();
        if(!res.ok)
            throw new Error('something went wrong..');
        
        console.log(resData);
        return resData;
    }
    catch(err){
        throw err;
    }
}


const Expense = () => {
    const [showForm, setShowForm] = useState(false);
    const [expenseList, setExpenseList] = useState([]);
    console.log('fffff')

    const total = expenseList.reduce((acc,curr)=>acc+ Number(curr.amount),0);

    const addExpenseHandler = async (expense) => {
        try{
            const newExpense = await addExpenseToDB(expense);
            setExpenseList((oldList)=>{
                expense.id=newExpense.name;
                return [...oldList, expense];
            });
        }
        catch(err){
            alert(err.message);
        }
    }

    useEffect(()=>{
        (async()=>{
            try{
                const expenses = await fetchExpenseFromDB();
                setExpenseList(Object.keys(expenses).map(key=>{
                    return {id:key, ...expenses[key]}
                }));
            }
            catch(err){
                alert(err.message);
            }
        })()
        // setExpenseList(expenses);
    },[]);

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