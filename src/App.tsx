import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from './components/Home'
import EditProfile from './components/EditProfile'
import Profile from './components/Profile'
import Error from './components/Error'

function App() {
  return (
    <>
    <Router>
        <ul>
          <li><Link to="/edit-profile/">Edit Profile</Link></li>
          <li><Link to="/profile/">Profile</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/profile/:userId" component={Profile}/>
          <Route path="/edit-profile/:userId" component={EditProfile}/>
          <Route component={Error}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
