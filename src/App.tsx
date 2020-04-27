import React, {Fragment} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./components/HomePage";
import EditProfilePage from "./components/EditProfilePage";
import ProfilePage from "./components/ProfilePage";
import ErrorPage from "./components/ErrorPage";
import { Profile } from "./store/types/types";
import { RootState } from "./store";
import { connect } from "react-redux";

export interface IAppProps {
  loggedIn: boolean;
  profiles: Profile[];
}

export class App extends React.Component<IAppProps> {
  public render() {

    if (sessionStorage.getItem("loggedIn") === 'true') { // check session Storage to see if the global logged in variable is set. This variable is changed in ProfilePage.tsx in loggedOut(), in HomePage.tsx within the render()  fucntion

      return ( // if you're logged in, switch through the paths in the order shown below. There should be a reroute to the profile page if you manually enter the homepage url.
        <>
          <Router>
            
            <Fragment>  
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/edit-profile/" component={EditProfilePage} />
                    <Route component={ErrorPage} />
                  </Switch>
            </Fragment>
                               
            
           
          </Router>
        </>
      );
    }

    return ( // If you're not logged in you're be routed to the Home page ('/') or to the error page if you try to access any other URL other than '/'
      <>
        <Router>
          <Switch>
            <Route>
              <Redirect from="/*" to="/"/>
              <Route exact path="/" component={Home}/>
            </Route>
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: state.profile.loggedIn,
    profiles: state.profile.profiles
  };
};

export default connect(mapStateToProps)(App);