import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { emailVerificationHandler, updateProfileBackend } from '../../../services/userProfileService';
import NavBar from "../../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../../store/authSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.auth.userData);
    const userToken = useSelector((state)=>state.auth.token);
    const nameRef = useRef('');
    const photoRef = useRef('');
    const [reset, setReset] = useState(false);

    useEffect(()=>{
        nameRef.current.value = userData.displayName || '';
        photoRef.current.value = userData.photoUrl || '';
    },[userData, reset]);

    const updateProfile = async(e) => {
        e.preventDefault();
        if(nameRef.current.value.trim()==='')
            return alert('Please enter a valid full name');
        if(photoRef.current.value.trim()==='')
            return alert('Please enter a valid photo url.');
        try{
            const userProfile = await updateProfileBackend({idToken: userToken, displayName: nameRef.current.value, photoUrl: photoRef.current.value, deleteAttribute: [], returnSecureToken: true});
            dispatch(authSliceActions.updateProfile(userProfile));
            alert('user profile updated!');
        }
        catch(err){
            alert(err.message);
        }
    }


    return (
        <Container fluid className="p-0">
            <NavBar/>
            <h1 className="fw-medium mt-3 ps-3" style={{fontSize:'1.5rem'}}>Contact Details</h1>
            <span className="ps-3 fw-medium me-2">Email: {userData.email}</span><span>{!userData.emailVerified ? <Button onClick={()=>emailVerificationHandler()}>Verify</Button> : ''}</span>
            <Form onSubmit={(e)=>updateProfile(e)} className="ps-3 mt-2">
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
                    <Button className="col col-3 col-lg-1" variant="none" style={{border: '2px solid rgb(179, 101, 101)', color: 'rgb(179, 101, 101)'}} onClick={()=>setReset(resetVal => !resetVal)}>Cancel</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default Profile;