import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from './authentication.module.css';
const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

const Authentication = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const cnfPasswordRef = useRef('');
    const [isSignIn, setIsSignIn] = useState(true);

    const AuthHandler = (e) => {
        e.preventDefault();
        if(emailRef.current.value.trim()==='')
            return alert('Email must be non-empty');
        if(passwordRef.current.value.trim()==='' || passwordRef.current.value.length<6)
            return alert('Password must be non-empty and minimum 6 characters long');
        if(!isSignIn && passwordRef.current.value !== cnfPasswordRef.current.value)
            return alert('Confirm password field must must match with the password field');

        authenticationHandler();
    }

    async function authenticationHandler() {
        try{
            console.log(FIREBASEKEY);
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isSignIn ? 'signInWithPassword': 'signUp'}?key=${FIREBASEKEY}`,{
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    returnSecureToken: true,
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const resData = await res.json();
            if(!res.ok){
                throw new Error(resData.error.message);
            }
    
            //   authCtx.addToken(resData.idToken, resData.expiresIn);
            alert(`${isSignIn ? 'User sign in successful' : 'User sign up successful'}`);
            emailRef.current.value='';
            passwordRef.current.value='';
            cnfPasswordRef.current.value='';
            //   history.push('/profile');
        }
        catch(err){
            console.log(err.message); 
            alert(err.message);
        }
        finally{
            // setIsLoading(false);
        }
    }

    return (
        <div>
            <Form onSubmit={(e)=>AuthHandler(e)} className={classes.auth + " shadow rounded-2 d-flex flex-column gap-2 border border-2 rounded-2  pt-4 pb-5 ps-3 pe-3 mb-4 "}>
                <span className="mb-4 fs-3 ">{isSignIn ? 'SignIn' : 'SignUp'}</span>
                <Form.Control type='email' placeholder='Email' ref={emailRef} required></Form.Control>
                <Form.Control type='password' placeholder='Password' ref={passwordRef} required></Form.Control>
                {!isSignIn && <Form.Control type='password' placeholder='Confirm Password' ref={cnfPasswordRef} required></Form.Control>}
                <Button type="submit" className="rounded-5 mt-3">{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
            </Form>
            <div className="btn border border-dark  mx-auto shadow p-2 rounded-2 bg-success-subtle " onClick={()=>setIsSignIn(!isSignIn)} style={{width: '20rem'}}>
                {isSignIn ? 'Don\'t have an account? Sign Up' : 'Have an account? Sign In'}
            </div>
        </div>
    )
}

export default Authentication;