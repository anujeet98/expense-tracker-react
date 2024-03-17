import { Button } from "react-bootstrap";
import Switch from '../UI/Switch';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authSliceActions } from "../../store/authSlice";


const NavBar = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const premiumEligible = useSelector((state)=>state.auth.premiumEligible);
    const premiumStatus = useSelector((state)=>state.auth.premium);

    const signoutHandler = () => {
        localStorage.removeItem('expensetracker-token');
        dispatch(authSliceActions.logout());
        history.push('/');
    }
    return (
        <div className="bg-dark text-white border-bottom border-dark border-2 p-3 shadow d-flex justify-content-between flex-column flex-sm-row">
            <span className="fst-italic my-auto ">Welcome to Expense Tracker!!!</span>
            <div>
                {premiumEligible && !premiumStatus && <Button className="bg-transparent border-0 " onClick={()=>dispatch(authSliceActions.setPremiumStatus())} >Buy Premium</Button>}
                {premiumStatus && <Switch/>}
                {props.children}
                <Button className="ms-2" onClick={signoutHandler}>Sign Out</Button>
            </div>
        </div>
    )
}

export default NavBar;