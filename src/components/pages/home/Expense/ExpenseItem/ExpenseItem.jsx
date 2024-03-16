import { memo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { deleteExpenseFromDB } from "../../../../../services/expenseService"; 
import { useDispatch } from "react-redux";
import { expenseSliceActions } from "../../../../../store/expenseSlice";

const ExpenseItem = (props) => {
    const [hideDescr, setHideDescr] = useState(true);
    const dispatch = useDispatch();
    const deleteHandler = () => {
        deleteExpenseFromDB(props.data.id); 
        dispatch(expenseSliceActions.deleteExpense(props.data.id));
    };
    const editHandler = () => {
        dispatch(expenseSliceActions.setExpenseToEdit(props.data.id));
    }

    return (
        <Container fluid className="border-bottom border-2 py-3">
            <Row>
                <Col className="col-10 ">
                    <Row>
                        <Col className="col-3 d-flex align-items-center fs-4" onClick={()=>setHideDescr(!hideDescr)}>{props.data.category}</Col>
                        <Col className="col-1"><i className="ri-edit-box-line fs-4 btn border-0 " onClick={editHandler}></i></Col>
                        <Col className="col-1"><i className="ri-delete-bin-4-line fs-4 text-danger btn border-0 " onClick={deleteHandler}></i></Col>
                    </Row>
                    {!hideDescr && <Row><Col>{props.data.description}</Col></Row>}
                </Col>
                <Col className="col-2 d-flex align-items-center ">Rs. {props.data.amount}</Col>
            </Row>
        </Container>
    )
}

export default memo(ExpenseItem);