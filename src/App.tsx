import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./components/HomePage";
import EditProfilePage from "./components/EditProfilePage";
import ProfilePage from "./components/ProfilePage";
import ErrorPage from "./components/ErrorPage";
import { Profile } from "./store/types/types";
import { RootState } from "./store";
import { addProfile } from "./store/actions/actions";
import { connect } from "react-redux";


export interface IAppProps {
  loggedIn: boolean;
  profiles: Profile[];
}

export class App extends React.Component<IAppProps> {
  public render() {

    if (sessionStorage.getItem("loggedIn") === "true") { // check session Storage to see if the global logged in variable is set. This variable is changed in ProfilePage.tsx in loggedOut(), in HomePage.tsx within the render()  fucntion
      const uName = sessionStorage.getItem("userName"); // if the loggedIn global variable is set, then the global userName variable should be set

      return ( // if you're logged in, switch through the paths in the order shown below. There should be a reroute to the profile page if you manually enter the homepage url.
        <>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route path="/profile">
                <Link to="" component={ProfilePage} />
                <Redirect to={`/profile/${uName}`} />
              </Route>
              <Route path={`/edit-profile/${uName}`} component={EditProfilePage} />
              <Route component={ErrorPage} />
            </Switch>
          </Router>
        </>
      );
    }

    return (
      <>
        <Router>
          <Switch>
            <Route  path="/" component={Home} />
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

export default connect(mapStateToProps, { addProfile })(App);
