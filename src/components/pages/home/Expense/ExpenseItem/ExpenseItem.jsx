import { memo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// <span onClick={()=>setHideDescr(!hideDescr)} className="fw-bolder me-1" style={{fontSize:'12px'}}>{hideDescr ? 'V' : 'Ʌ' }</span> 
const deleteExpenseFromDB = async(id) => {
    try{
        const res = await fetch(`https://expense-tracker-6d78c-default-rtdb.firebaseio.com/expense/expense/${id}.json`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        const resData = await res.json();
        if(!res.ok)
            throw new Error(resData);
        
        alert('Item has been deleted');
    }
    catch(err){
        alert(err.message);
    }
}

const ExpenseItem = (props) => {
    const [hideDescr, setHideDescr] = useState(true);

    const deleteHandler = () => {
        deleteExpenseFromDB(props.data.id); 
        props.onDelete(props.data.id);
    }

    return (
        <Container fluid className="border-bottom border-2 py-3">
            <Row>
                <Col className="col-10 ">
                    <Row>
                        <Col className="col-3 d-flex align-items-center fs-4" onClick={()=>setHideDescr(!hideDescr)}>{props.data.category}</Col>
                        <Col className="col-1"><i className="ri-edit-box-line fs-4" onClick={props.onEdit}></i></Col>
                        <Col className="col-1"><i className="ri-delete-bin-4-line fs-4 text-danger " onClick={deleteHandler}></i></Col>
                    </Row>
                    {!hideDescr && <Row><Col>{props.data.description}</Col></Row>}
                </Col>
                <Col className="col-2 d-flex align-items-center ">Rs. {props.data.amount}</Col>
            </Row>
        </Container>
    )
}

export default memo(ExpenseItem);