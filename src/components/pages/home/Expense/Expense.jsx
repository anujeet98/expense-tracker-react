import { Card } from "react-bootstrap";
import classes from './ExpenseForm/Expense.module.css';
import { Fragment, useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseItem from "./ExpenseItem/ExpenseItem.jsx";
import { fetchExpenseFromDB } from '../../../../services/expenseService.js'
import { useDispatch, useSelector } from "react-redux";
import { expenseSliceActions } from "../../../../store/expenseSlice.js";
import { authSliceActions } from "../../../../store/authSlice.js";
import DownloadModal from "../../../Download/DownloadModal.jsx";

const Expense = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const premiumStatus = useSelector((state)=>state.auth.premium);
    const expenseState = useSelector((state)=>state.expense.expenseList);
    const expenseToEdit = useSelector((state)=>state.expense.expenseToEdit);
    const [expenseList, setExpenseList] = useState(expenseState);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setshowModal] = useState(false);
    
    const total = expenseState.reduce((acc,curr)=>acc+ Number(curr.amount),0);
    
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
        const total = expenseState.reduce((acc,curr)=>acc+ Number(curr.amount),0);
        if(total>10000) dispatch(authSliceActions.setPremiumEligible());
    }, [expenseState]);

    useEffect(()=>{
        if(expenseToEdit)
            setShowForm(true)
    },[expenseToEdit]);
    // console.log(expenseState);

    return (
        <Fragment>
            <DownloadModal showModal={showModal} hideModal={()=>setshowModal(false)} data={expenseList}/>
        <Card className={classes.expense + ` h-100 p-0 ${isDarkMode ? 'bg-dark text-light ' : ''} `}>
            <div className={`w-100 shadow rounded-3 ${isDarkMode ? 'bg-black ' : ''} `}>
            {
                showForm ? <ExpenseForm onFormClose={()=>{setShowForm(!showForm)}} /> 
                : <Fragment><i onClick={()=>setShowForm(!showForm)} className={`ri-add-box-fill p-0 text-success  ms-2 btn border-0 `} style={{fontSize: '3rem'}}></i>{premiumStatus && <i className={`ri-file-download-fill ms-2 p-0 text-primary  btn border-0 `} style={{fontSize: '2.7rem'}} onClick={()=>setshowModal(state=>!state)}></i>}</Fragment>
            }
            </div>

            <div className={classes.displayContainer}>
                <div className={"d-flex justify-content-between ps-2  fs-4 fw-bolder border-bottom border-4 border-dark-subtle "+`${isDarkMode ? 'text-light bg-success ' : ' bg-success-subtle '}`}><span className="col-10">Total Expenses</span><span className="col-2">Rs. {total}</span></div>
                {
                    expenseList.map((expense)=>(
                        <ExpenseItem key={expense.id} data={expense} />
                    ))
                }
            </div>
        </Card>
        </Fragment>
    )
}

export default Expense;