import { useRef } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

async function updateProfileBackendHandler(authobj) {
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASEKEY}`,{
            method: 'POST',
            body: JSON.stringify(authobj),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        if(!res.ok){
            throw new Error(resData.error.message);
        }
        return resData;
    }
    catch(err){
        throw err;
    }
    finally{
        // setIsLoading(false);
    }
}

const Profile = () => {
    const nameRef = useRef('');
    const photoRef = useRef('');
    const history = useHistory();

    const updateProfileHandler = async(e) => {
        try{
            e.preventDefault();
            if(nameRef.current.value.trim()==='')
                return alert('Profile name must be non-empty');
            if(photoRef.current.value.trim()==='')
                return alert('Photo url name must be non-empty');
            const token  = localStorage.getItem('expensetracker-token');
    
            if(!token)
                return alert('user session expired, kindly sign in again');
    
            const resData = await updateProfileBackendHandler({idToken: token, displayName: nameRef.current.value, photoUrl: photoRef.current.value, deleteAttribute: [], returnSecureToken: true});
    
            console.log(resData);
            alert('user profile updated!');
            nameRef.current.value='';
            photoRef.current.value='';
            // history.push('/home');
        }
        catch(err)
        {
            console.error(err);
            alert(err.message);
        }
    }

    return (
        <Container fluid className="p-0">
            <div className="border-bottom border-bg-dark border-2 p-3 shadow d-flex justify-content-between ">
                <span className="fst-italic ">Welcome to Expense Tracker!!!</span>
            </div>

            <h1 className="fw-medium mt-3 ps-3" style={{fontSize:'1.5rem'}}>Contact Details</h1>
            <Form onSubmit={(e)=>updateProfileHandler(e)} className="ps-3">
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
                    <Button type="submit" className="col col-3 col-md-1 border-0 " style={{backgroundColor: 'rgb(179, 101, 101)'}}>Update</Button>
                    <Button className="col col-3 col-md-1" variant="none" style={{border: '2px solid rgb(179, 101, 101)', color: 'rgb(179, 101, 101)'}}>Cancel</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default Profile;