import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { updateProfileHandler, fetchProfileHandler, emailVerificationHandler } from './profile-handlers';
import NavBar from "../../NavBar/NavBar";



const Profile = () => {
    const nameRef = useRef('');
    const photoRef = useRef('');
    const [email, setEmail] = useState('');
    const [isVerify, setIsVerify] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        (async()=>{
            try{
                const resData = await fetchProfileHandler();
                nameRef.current.value=resData.displayName;
                photoRef.current.value=resData.photoUrl;
                setEmail(resData.email);
                setIsVerify(resData.emailVerified);
            }
            catch(err){
                console.log(err.message);
                alert(err.message);
            }
        })()
    },[]);

    return (
        <Container fluid className="p-0">
            <NavBar/>
            <h1 className="fw-medium mt-3 ps-3" style={{fontSize:'1.5rem'}}>Contact Details</h1>
            <span className="ps-3 fw-medium me-2">Email: {email}</span><span>{!isVerify ? <Button onClick={()=>emailVerificationHandler()}>Verify</Button> : ''}</span>
            <Form onSubmit={(e)=>updateProfileHandler(e,nameRef.current.value, photoRef.current.value)} className="ps-3 mt-2">
                <Row className="d-flex gap-2">
                    <Form.Group className="d-flex col col-12 col-md-5">
                        <Form.Label className="fw-medium w-50">Full Name:</Form.Label>
                        <Form.Control type="text" ref={nameRef} />
                    </Form.Group>
                    <Form.Group className="d-flex col col-12 col-md-5">
                        <Form.Label className="fw-medium w-50">Profile Photo URL:</Form.Label>
                        <Form.Control type="text" ref={photoRef} />
                    </Form.Group>
                </Row>
                <Row className="d-flex gap-5 mt-3 ps-3">
                    <Button type="submit" className="col col-3 col-lg-1 border-0 " style={{backgroundColor: 'rgb(179, 101, 101)'}}>Update</Button>
                    <Button className="col col-3 col-lg-1" variant="none" style={{border: '2px solid rgb(179, 101, 101)', color: 'rgb(179, 101, 101)'}}>Cancel</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default Profile;