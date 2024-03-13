import { memo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// <span onClick={()=>setHideDescr(!hideDescr)} className="fw-bolder me-1" style={{fontSize:'12px'}}>{hideDescr ? 'V' : 'Ʌ' }</span> 


const ExpenseItem = (props) => {
    const [hideDescr, setHideDescr] = useState(true);
    return (
        <Container fluid className="border-bottom border-2 py-3">
            <Row>
                <Col className="col-10 ">
                    <Row>
                        <Col className="col-3 d-flex align-items-center fs-4" onClick={()=>setHideDescr(!hideDescr)}>{props.data.category}</Col>
                        <Col className="col-1"><i className="ri-edit-box-line fs-4"></i></Col>
                        <Col className="col-1"><i className="ri-delete-bin-4-line fs-4 text-danger "></i></Col>
                    </Row>
                    {!hideDescr && <Row><Col>{props.data.description}</Col></Row>}
                </Col>
                <Col className="col-2 d-flex align-items-center ">Rs. {props.data.amount}</Col>
            </Row>
        </Container>
    )
}

export default memo(ExpenseItem);