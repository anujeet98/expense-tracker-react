import { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";


const ExpenseForm = (props) => {
    const amountRef = useRef(0);
    const descriptionRef = useRef('');
    const categoryRef = useRef('');

    useEffect(()=>{
        if(props.expenseToEdit)
        {
            amountRef.current.value = +props.expenseToEdit.amount;
            descriptionRef.current.value = props.expenseToEdit.description;
            categoryRef.current.value = props.expenseToEdit.category;
        }
    });

    const formSubmitHandler = (e) =>{
        e.preventDefault();
        if(amountRef.current.value<=0)
            return alert('Amount must be greater than 0');
        props.onFormSubmit({category: categoryRef.current.value, amount: amountRef.current.value, description: descriptionRef.current.value});
        amountRef.current.value='';
        descriptionRef.current.value='';
        // categoryRef.current.value='Category';
    }


    return (
        <Form className="p-3 shadow rounded-2 bg-dark" onSubmit={(e)=>formSubmitHandler(e)}>
            <div className="d-flex gap-3">
                <Form.Select ref={categoryRef} defaultValue={'Category'} required>
                    <option>Food</option>
                    <option>Fuel</option>
                    <option>Electronics</option>
                    <option>Travel</option>
                    <option>Rent</option>
                    <option>Movies</option>
                    <option>Bills</option>
                    <option>Miscellaneous</option>
                </Form.Select>
                <Form.Control type="number" ref={amountRef} placeholder="Amount" min={0} required/>
                <div className="d-flex gap-2 align-items-center">
                    <Button type="submit" className="p-0 m-0 bg-transparent border-0 "><i className="fa fa-check-square fs-1  p-0 m-0 text-success "></i></Button>
                    <Button type="submit" className="p-0 m-0 bg-transparent border-0 "><i onClick={()=>{props.onFormClose()}} className="fa fa-window-close fs-1 p-0 m-0 text-danger "></i></Button>
                </div>
            </div>
            <div>
                <textarea className="form-control mt-3" ref={descriptionRef} rows="2" placeholder="Description" required />
            </div>
        </Form>
    )
}

export default ExpenseForm;