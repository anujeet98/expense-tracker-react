import { useRef, useState } from "react";
import { Button, Form} from "react-bootstrap";
import classes from './authentication.module.css';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { Link } from "react-router-dom";
const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

async function authenticationHandler(authType, authobj) {
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${authType ? 'signInWithPassword': 'signUp'}?key=${FIREBASEKEY}`,{
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


const Authentication = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const cnfPasswordRef = useRef('');
    const [isSignIn, setIsSignIn] = useState(true);
    const history = useHistory();

    const AuthHandler = async(e) => {
        try{
            e.preventDefault();
            if(emailRef.current.value.trim()==='')
                return alert('Email must be non-empty');
            if(passwordRef.current.value.trim()==='' || passwordRef.current.value.length<6)
                return alert('Password must be non-empty and minimum 6 characters long');
            if(!isSignIn && passwordRef.current.value !== cnfPasswordRef.current.value)
                return alert('Confirm password field must must match with the password field');
    
            //authCtx.addToken(resData.idToken, resData.expiresIn);
            const resData = await authenticationHandler(isSignIn, {email: emailRef.current.value, password: passwordRef.current.value, returnSecureToken: true});
            localStorage.setItem('expensetracker-token', resData.idToken);
            alert(`${isSignIn ? 'User sign in successful' : 'User sign up successful'}`);
            emailRef.current.value='';
            passwordRef.current.value='';
            if(!isSignIn)
                cnfPasswordRef.current.value='';
            history.push('/home');
        }
        catch(err){
            console.log(err.message); 
            alert(err.message);
        }
    }

    return (
        <div className={classes.authContainer}>
            <Form onSubmit={(e)=>AuthHandler(e)} className={classes.auth + " shadow rounded-2 d-flex flex-column gap-2 border border-2 rounded-2  pt-4 pb-5 px-3 mb-4 "}>
                <span className="mb-4 fs-3 ">{isSignIn ? 'SignIn' : 'SignUp'}</span>
                <Form.Control type='email' placeholder='Email' ref={emailRef} required></Form.Control>
                <Form.Control type='password' placeholder='Password' ref={passwordRef} required></Form.Control>
                {!isSignIn && <Form.Control type='password' placeholder='Confirm Password' ref={cnfPasswordRef} required></Form.Control>}
                {isSignIn && <NavLink to='/forget'>forgot password</NavLink>}
                <Button type="submit" className="rounded-5 mt-3">{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
            </Form>
            <div className="btn border border-dark  ms-auto shadow p-2 rounded-2 bg-success-subtle " onClick={()=>setIsSignIn(!isSignIn)} style={{width: '20rem'}}>
                {isSignIn ? 'Don\'t have an account? Sign Up' : 'Have an account? Sign In'}
            </div>
        </div>
    )
}

export default Authentication;