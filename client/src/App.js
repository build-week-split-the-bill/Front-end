import React, { useState } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login.js';
import Bills from './Components/Bills.js';
import Register from './Components/Register.js';
import NavBar from './Components/NavBar.js';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  return (
    <div className='App'>
      <NavBar token={token} setToken={setToken} />
      <Switch>
        <Route
          exact
          path='/login'
          render={(...props) => <Login {...props} />}
        />
        <Route
          exact
          path='/register'
          render={(...props) => <Register {...props} />}
        />
        <Route
          exact
          path='/bills'
          render={(...props) => <Bills {...props} />}
        />
        <Route
          exact
          path='/'
          render={(...props) =>
            token && user ? <Redirect to='/bills' /> : <Redirect to='/login' />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
