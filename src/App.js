import logo from './logo.svg';
import './App.css';
import React from 'react'
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CustomRoute } from './constants/RouteConstant';

class App extends React.Component {
  render() {
    return (
      <Router>
          <div className='App'>
            <Routes>
                <Route exact path={CustomRoute.HOME} element={
                  <div>
                    <p>Hi, This is a simple React Website.</p>
                    <p>Match Route to /signin and /signup to toggle Signin and Signup Screen respectively.</p>
                  </div>
                } />
                <Route exact path={CustomRoute.SIGNIN} element={<Signin/>} />
                <Route exact path={CustomRoute.SIGNUP} element={<Signup/>} />
            </Routes>
          </div>
        </Router>
    );
  }
  
}

export default App;
