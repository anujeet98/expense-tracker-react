import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Authentication from './components/pages/authentication/Authentication';
import Home from './components/pages/home/Home';
import Profile from './components/pages/profile/Profile';
import { useState } from 'react';
import ForgetPassword from './components/pages/authentication/ForgetPassword';

function App() {
    const [token, setToken] = useState(localStorage.getItem('expensetracker-token'));
    return (
        <Switch>
            <Route path='/' exact>
                <Authentication/>
            </Route>
            <Route path='/home' exact>
                { token ? <Home/> : <Redirect to='/' />}
            </Route>
            <Route path='/profile' exact>{ token ? <Profile/> : <Redirect to='/'/> }</Route>
            <Route path='/password/forget' exact><ForgetPassword/></Route>
        </Switch>
    );
}

export default App;
