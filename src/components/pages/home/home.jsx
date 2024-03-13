import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../../NavBar/NavBar";
import Expense from "./Expense/Expense";


const Home = () => {
    return (
        <Container fluid className="p-0 bg-secondary vh-100">
            <NavBar><span className="fst-italic bg-danger-subtle text-dark p-1 rounded-3" style={{fontSize:'0.8rem'}}>Your profile is incomplete. <NavLink to="/profile">Complete Now</NavLink></span></NavBar>
        
            <Expense/>
        </Container>
    )
}

export default Home;