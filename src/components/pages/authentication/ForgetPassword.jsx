import { useRef } from "react";
import { Button, Form} from "react-bootstrap";
import classes from './authentication.module.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { Link } from "react-router-dom";
const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

async function resetBackendHandler(resetobj) {
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASEKEY}`,{
            method: 'POST',
            body: JSON.stringify(resetobj),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        if(!res.ok){
            throw new Error(resData.error.message);
        }
    }
    catch(err){
        throw err;
    }
    finally{
        // setIsLoading(false);
    }
}


const ForgetPassword = () => {
    const emailRef = useRef('');
    // const [isSignIn, setIsSignIn] = useState(true);
    // const history = useHistory();

    const resetHandler = async(e) => {
        try{
            e.preventDefault();
            if(emailRef.current.value.trim()==='')
                return alert('Email must be non-empty');
    
            //authCtx.addToken(resData.idToken, resData.expiresIn);
            await resetBackendHandler({requestType: 'PASSWORD_RESET', email: emailRef.current.value});
            alert(`password reset link sent to your email`);
            emailRef.current.value='';
        }
        catch(err){
            console.log(err.message); 
            alert(err.message);
        }
    }



    return (
        <div className={classes.authContainer}>
            <Form onSubmit={(e)=>resetHandler(e)} className={classes.auth + " shadow rounded-2 d-flex flex-column gap-2 border border-2 rounded-2  pt-4 pb-5 px-3 mb-4 "}>
                <span className="mb-4 fs-3 ">Password Reset</span>
                <Form.Control type='email' placeholder='Email' ref={emailRef} required></Form.Control>
                <Button type="submit" className="rounded-5 mt-3">Reset</Button>
            </Form>
            <NavLink to='/'><div className="btn border border-dark  ms-auto shadow p-2 rounded-2 bg-success-subtle " style={{width: '20rem'}}>
                    Go back to Sign In
                </div>
            </NavLink>
        </div>
    )
}

export default ForgetPassword;