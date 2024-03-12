import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Authentication from './components/pages/authentication/authentication';
import Home from './components/pages/home/home';

function App() {
    return (
        <Switch>
              <Route path='/' exact>
                  <Authentication/>
              </Route>
              <Route path='/home' exact>
                  <Home/>
              </Route>
        </Switch>
    );
}

export default App;
