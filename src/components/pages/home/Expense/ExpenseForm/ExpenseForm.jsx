import { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveExpenseToDB } from "../../../../../services/expenseService";
import { expenseSliceActions } from "../../../../../store/expenseSlice";
import classes from './Expense.module.css'

const ExpenseForm = (props) => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state=>state.theme.isDarkMode);
    const expenseToEdit = useSelector((state)=>state.expense.expenseToEdit);
    const amountRef = useRef(0);
    const descriptionRef = useRef('');
    const categoryRef = useRef('');

    useEffect(()=>{
        if(expenseToEdit)
        {
            amountRef.current.value = expenseToEdit.amount;
            descriptionRef.current.value = expenseToEdit.description;
            categoryRef.current.value = expenseToEdit.category;
        }
    },[expenseToEdit]);

    const formSubmitHandler = async(e) =>{
        e.preventDefault();
        if(amountRef.current.value<=0)
            return alert('Amount must be greater than 0');
        const expense = {category: categoryRef.current.value, amount: amountRef.current.value, description: descriptionRef.current.value};
        const methodType = expenseToEdit ? 'PUT' : 'POST'; //if item to edit is present then set method type PUT else POST
        const idToEdit = expenseToEdit ? expenseToEdit.id : null;  //for PUT get id from edit item state, else for post it will be null
        try{
            const result = await saveExpenseToDB(methodType, idToEdit, expense);
            if(methodType==='POST')
                dispatch(expenseSliceActions.addExpense({...expense, id: result.name}));
            else
                dispatch(expenseSliceActions.editExpense({id: idToEdit, ...result}));
            dispatch(expenseSliceActions.unsetExpenseToEdit());
        }
        catch(err){
            alert(err.message);
        }
        amountRef.current.value='';
        descriptionRef.current.value='';
        // categoryRef.current.value='Category';
    }

    const formCloseHandler = () => {
        props.onFormClose();
        dispatch(expenseSliceActions.unsetExpenseToEdit());
    }

    return (
        <Form className={` ${isDarkMode ? ` ${classes.darkMode} ` : ` ${classes.lightMode} `}  p-3 shadow rounded-2 `} onSubmit={(e)=>formSubmitHandler(e)}>
            <div className="d-flex gap-3">
                <Form.Select ref={categoryRef} defaultValue={'Category'} className={` border-0  border-bottom border border-success  shadow fw-bold ${isDarkMode ? '  ':' bg-transparent '}  `} required>
                    <option>Food</option>
                    <option>Fuel</option>
                    <option>Electronics</option>
                    <option>Travel</option>
                    <option>Rent</option>
                    <option>Movies</option>
                    <option>Bills</option>
                    <option>Miscellaneous</option>
                </Form.Select>
                <Form.Control type="number" ref={amountRef} placeholder="Amount" className={`border-0  border-bottom border-success  shadow fw-bold ${isDarkMode ? '  ':' bg-transparent '} `} min={0} required/>
                <div className="d-flex gap-2 align-items-center">
                    <Button type="submit" className="p-0 m-0 bg-transparent border-0  "><i className="fa fa-check-square fs-1  p-0 m-0 text-success shadow  "></i></Button>
                    <Button type="submit" className="p-0 m-0 bg-transparent border-0  "><i onClick={formCloseHandler} className="fa fa-window-close fs-1 p-0 m-0 text-danger shadow "></i></Button>
                </div>
            </div>
            <div>
                <textarea className={`form-control mt-3 shadow border-success fw-bold ${isDarkMode ? '  ':' bg-transparent '}  `} ref={descriptionRef} rows="2" placeholder="Description" required />
            </div>
        </Form>
    )
}

export default ExpenseForm;