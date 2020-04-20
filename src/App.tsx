import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/Home'
import EditProfilePage from './components/EditProfile'
import ProfilePage from './components/Profile'
import ErrorPage from './components/Error'

import {RootState} from './store'
import {addProfile} from './store/actions/actions'
import {connect} from 'react-redux';
import {Profile} from '../src/store/types/types'

export interface IAppProps{
  profiles: Profile[]
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
      profiles: state.profile.profiles,
  };
}

export default connect (
  mapStateToProps,
  {addProfile},
)(App);
