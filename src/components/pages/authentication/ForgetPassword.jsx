import { useRef } from "react";
import { Button, Form} from "react-bootstrap";
import classes from './authentication.module.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { resetPassword } from "../../../services/userProfileService";
import { useSelector } from "react-redux";


const ForgetPassword = () => {
    const isDarkMode = useSelector(state=>state.theme.isDarkMode);
    const emailRef = useRef('');
    const resetHandler = async(e) => {
        try{
            e.preventDefault();
            if(emailRef.current.value.trim()==='' && /\S+@\S+\.\S+/.test(emailRef.current.value))
                return alert('Please enter valid email.');
    
            await resetPassword({requestType: 'PASSWORD_RESET', email: emailRef.current.value});
            alert(`Password reset link sent to your email`);
            emailRef.current.value='';
        }
        catch(err){
            alert(err);
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