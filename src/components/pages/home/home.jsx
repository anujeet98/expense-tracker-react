import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


const Home = () => {
    return (
        <Container fluid className="p-0">
            <div className="border-bottom border-bg-dark border-2 p-3 shadow d-flex justify-content-between ">
                <span className="fst-italic ">Welcome to Expense Tracker!!!</span>
                <span className="fst-italic bg-danger-subtle p-1 rounded-3" style={{fontSize:'0.8rem'}}>Your profile is incomplete. <NavLink to="/profile">Complete Now</NavLink></span>
            </div>
        </Container>
    )
}

export default Home;