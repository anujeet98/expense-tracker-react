import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from './authentication.module.css'


const Authentication = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const cnfPasswordRef = useRef('');
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div>
            <Form className={classes.auth + " shadow rounded-2 d-flex flex-column gap-2 border border-2 rounded-2  pt-4 pb-5 ps-3 pe-3 mb-4 "}>
                <span className="mb-4 fs-3 ">{isSignIn ? 'SignIn' : 'SignUp'}</span>
                <Form.Control type='email' placeholder='Email' ref={emailRef} required></Form.Control>
                <Form.Control type='password' placeholder='Password' ref={passwordRef} required></Form.Control>
                {isSignIn && <Form.Control type='password' placeholder='Confirm Password' ref={cnfPasswordRef} required></Form.Control>}
                <Button className="rounded-5 mt-3">{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
            </Form>
            <div className="btn border border-dark  mx-auto shadow p-2 rounded-2 bg-success-subtle " onClick={()=>setIsSignIn(!isSignIn)} style={{width: '20rem'}}>
                {isSignIn ? 'Don\'t have an account? Sign Up' : 'Have an account? Sign In'}
            </div>
        </div>
    )
}

export default Authentication;