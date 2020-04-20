import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/HomePage'
import EditProfilePage from './components/EditProfilePage'
import ProfilePage from './components/ProfilePage'
import ErrorPage from './components/ErrorPage'

import {RootState} from './store'
import {addProfile} from './store/actions/actions'
import {connect} from 'react-redux';

export interface IAppProps{
}

export class App extends React.Component<IAppProps> {
  public render(){
  return (
    <>
    <Router>
        <ul>
          <li><Link to="/edit-profile/">Edit Profile</Link></li>
          <li><Link to="/profile/">Profile</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/profile/:userId" component={ProfilePage}/>
          <Route path="/edit-profile/:userId" component={EditProfilePage}/>
          <Route component={ErrorPage}/>
        </Switch>
      </Router>
    </>
  );
  }
}

const mapStateToProps = (state : RootState) => {
  return {
  };
}

export default connect (
  mapStateToProps,
  {addProfile},
)(App);
