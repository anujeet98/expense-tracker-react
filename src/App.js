import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Authentication from './components/pages/authentication/Authentication';
import Home from './components/pages/home/Home';
import Profile from './components/pages/profile/Profile';
import ForgetPassword from './components/pages/authentication/ForgetPassword';
import { getUserProfile } from './services/userProfileService';
import { authSliceActions } from "./store/authSlice";
import './App.css';

const reAuthenticatUser = async(token) => {
    try{
        //verify the token by fetching userProfile
        const userProfile = await getUserProfile({idToken : token});
        return userProfile;
    }
    catch(err){
        throw err;
    }
}

function App() {
    const history = useHistory();
    let location = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        (async()=>{
            const token = localStorage.getItem('expensetracker-token');
            if(token){ //if user is not logged in state => reauthenticate
                try{
                    const userProfile = await reAuthenticatUser(token);
                    dispatch(authSliceActions.login(token));
                    dispatch(authSliceActions.updateProfile(userProfile));
                }
                catch(err){
                    alert(`Error-${err.message}. \nRedirecting to login page...`);
                    history.push('/auth');
                }
            }
            if(!token && location.pathname !== '/auth'){
                alert('Error-INVALID_ID_TOKEN.\nRedirecting to sign-in page.. ');
                history.push('/auth');
            }
            setLoading(false);
        })()
    },[]);
    
    if (loading) {
        return <div className='container-fluid d-flex justify-content-center '>Loading...</div>;
    }

    return (
        <Switch>
            <Route path='/' exact>
                { isLoggedIn ? <Home/> : <Redirect to='/auth' />}
            </Route>
            <Route path='/auth' exact>
                <Authentication/>
            </Route>
            <Route path='/profile' exact>{ isLoggedIn ? <Profile/> : <Redirect to='/auth'/> }</Route>
            <Route path='/password/forget' exact><ForgetPassword/></Route>
        </Switch>
    );
}

export default App;
