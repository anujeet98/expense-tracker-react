import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../../NavBar/NavBar";
import Expense from "./Expense/Expense";
import { useSelector } from "react-redux";


const Home = () => {
    const userData = useSelector((state)=>state.auth.userData);
    const isProfileComplete = userData.emailVerified && userData.displayName && userData.photoUrl;
    return (
        <Container fluid className="p-0 bg-secondary vh-100">
            <NavBar>{isProfileComplete ? <NavLink to="/profile" className="btn text-light fs-3 m-0 p-0 border-0 "><i className="ri-user-fill"></i></NavLink> : <span className="fst-italic bg-danger-subtle text-dark p-1 rounded-3" style={{fontSize:'0.8rem'}}>Your profile is incomplete. <NavLink to="/profile">Complete Now</NavLink></span>}</NavBar>
        
            <Expense/>
        </Container>
    )
}

export default Home;