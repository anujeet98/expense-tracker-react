import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const NavBar = (props) => {
    const history = useHistory();
    const signoutHandler = () => {
        if(localStorage.getItem('expensetracker-token')){
            localStorage.removeItem('expensetracker-token');
            history.push('/');
        }
    }
    return (
        <div className="border-bottom border-bg-dark border-2 p-3 shadow d-flex justify-content-between ">
            <span className="fst-italic ">Welcome to Expense Tracker!!!</span>
            <div>
                {props.children}
                <Button className="ms-2" onClick={signoutHandler}>Sign Out</Button>
            </div>
        </div>
    )
}

export default NavBar;