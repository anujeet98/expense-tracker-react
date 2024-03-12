import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../../NavBar/NavBar";


const Home = () => {
    return (
        <Container fluid className="p-0">
            <NavBar><span className="fst-italic bg-danger-subtle p-1 rounded-3" style={{fontSize:'0.8rem'}}>Your profile is incomplete. <NavLink to="/profile">Complete Now</NavLink></span></NavBar>
        </Container>
    )
}

export default Home;