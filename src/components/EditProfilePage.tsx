import * as React from "react";
import { updateProfile } from "../store/actions/actions";
import { Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import { logOut } from "../store/actions/actions";
import { Profile } from "../store/types/types";
import { RootState } from "../store";
import ProfilePage from "./ProfilePage";
import { connect } from "react-redux";
import NavBar from "./subcomponents/NavBar";
import MediaQuery from 'react-responsive';

import {
  Grid,
  Header,
  Form,
  Segment,
  TextArea,
  Button,
  Container

} from "semantic-ui-react";

export interface IEditProfileState { // This holds the states of the current component that AREN'T passed as global variables. They are limited to only affecting this page.
  city: string;
  cohort: string;
  spoken: string;
  programming: string;
  aboutMe: string;
  redirect: boolean;
}

export interface IEditProfilePageProps { // This holds the variables that are passed from the store. mapStateToProps and connect link to this interface so that we can call our reducers and view the store state.
  match: any;
  profiles: Profile[]; // The list of our users
  logOut: typeof logOut; // A reducer
  updateProfile: typeof updateProfile; // A reducer
}

export class EditProfilePage extends React.Component<
  IEditProfilePageProps,
  IEditProfileState
> {
  constructor(props: IEditProfilePageProps) {
    super(props);
    this.state = { // initializing our local state variables (these are the blank input vales)
      city: "",
      cohort: "",
      spoken: "",
      programming: "",
      aboutMe: "",
      redirect: false
    };
  }

  handleCityChange = (e: React.FormEvent<HTMLInputElement>) => { // update our local state variables as the user inputs the city they want to change their profile value to
    this.setState({ city: e.currentTarget.value });
  };
  handleCohortChange = (e: React.FormEvent<HTMLInputElement>) => { // update our local state variables as the user inputs the cohort they want to change their profile value to
    this.setState({ cohort: e.currentTarget.value });
  };
  handleSpokenChange = (e: React.FormEvent<HTMLInputElement>) => { // update our local state variables as the user inputs the spoken language they want to change their profile value to
    this.setState({ spoken: e.currentTarget.value });
  };
  handleProgrammingChange = (e: React.FormEvent<HTMLInputElement>) => { //..etc
    this.setState({ programming: e.currentTarget.value });
  };
  handleAboutMeChange = (e: React.FormEvent<HTMLInputElement>) => { //.etc
    this.setState({ aboutMe: e.currentTarget.value });
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { // Our update profile function that calls the update profile REDUCER!
    // this updates our users profile
    event.preventDefault();

    let { city, cohort, spoken, programming, aboutMe } = this.state; // these are the fields that can be updated on our edit profile page
    let { updateProfile, profiles } = this.props; // updateProfile is the function imported from actions and profiles in our array of saved profiles

    let uName = profiles.filter(profile => profile.loggedIn === true); // find out who user is logged in

    if (uName[0].name != null) {
      let update: string[] = [
        uName[0].name,
        city,
        cohort,
        spoken,
        programming,
        aboutMe
      ];
      updateProfile(update); // our update profile REDUCER!
    }

    this.setState({ redirect: true }); // Sets a state that tells us which page to link to
  };

  handleRedirect = () => {
    this.setState({ redirect: true }); // Sets a state that tells us which page to link to
  };

  loggedOut = () => {
    let { logOut, profiles } = this.props;

    let uName = profiles.filter(profile => profile.loggedIn === true); // find out who user is logged in

    logOut(uName[0]); // log that user out - logOut is a reducer and uName[0] is the username of the logged in user
    sessionStorage.setItem(
      // after changes to our store, we want to save them in our sessionStorage
      "profiles",
      JSON.stringify(profiles)
    );
    sessionStorage.setItem("loggedIn", "false"); // log us out of our sessionStorage. This is still cheating a bit!
    // sessionStorage.setItem("userName", "");
  };
  
  public render() {
    let { profiles } = this.props;


    let uName = profiles.filter(profile => profile.loggedIn === true); // find out who user is logged in

    let { aboutMe, name, cohort, programming, spoken, city } = uName[0]; // These are our users profile fields, these are the variables that we will put into the JSX.

    if (this.state.redirect === true) {
      // in handleRedirect we set this state variable if we want to go to Profile Page
      return (
        <Router>
          {/* Render the Profile Page */}
          <Link to="" component={ProfilePage} />

          {/* Change the URL to /profile/**Logged in User** */}
          <Redirect to={`/profile/${name}`} />
        </Router>
      );
    }

    return (
      <React.Fragment>
      <NavBar redirect = {this.handleRedirect} goto= "Profile"/>
     
      <Container>
        <Segment>
       
       <Grid stackable  columns="equal">
         
       
         <Grid.Row>
         
           <Grid.Column >
    
             <Container style={{marginTop: 70}} className= "edit-profile">
               <h5>Current city:{" "}{city}</h5>
               <h5>Cohort:{" "}{cohort}</h5>
               <h5>Spoken languages:{" "}{spoken}</h5>
               <h5>Programming languages interested in:{" "}{programming}</h5>
               <h5>About Me:{" "}{aboutMe}</h5>
             </Container>
         
           </Grid.Column> 
          
           <Grid.Column>
             <Header as="h2" color="green" textAlign="center">
               Edit profile
             </Header>
             <Form size="large">
               <Segment stacked>
                 <Form.Input
                   fluid
                   icon="home"
                   iconPosition="left"
                   placeholder="Current City"
                   value={this.state.city}
                   onChange={this.handleCityChange}
                 />
                 <Form.Input
                   fluid
                   icon="users"
                   iconPosition="left"
                   placeholder="Cohort"
                   type="text"
                   value={this.state.cohort}
                   onChange={this.handleCohortChange}
                 />
                 <Form.Input
                   fluid
                   icon="language"
                   iconPosition="left"
                   placeholder="Spoken Languages"
                   type="text"
                   value={this.state.spoken}
                   onChange={this.handleSpokenChange}
                 />
                 <Form.Input
                   fluid
                   icon="code"
                   iconPosition="left"
                   placeholder="Programming Languages"
                   type="text"
                   value={this.state.programming}
                   onChange={this.handleProgrammingChange}
                 />
                 <Form.Field
                   control={TextArea}
                   label="About"
                   placeholder="Tell us more about you..."
                   value={this.state.aboutMe}
                   onChange={this.handleAboutMeChange}
                 />
                 <Button onClick={this.handleClick} color="green">
                   Save Changes
                 </Button>
               </Segment>
 
             </Form>
           </Grid.Column>
           <Grid.Column></Grid.Column>
         </Grid.Row>
       </Grid>
       </Segment>
     </Container>
    
     </React.Fragment>
    );     
  }
}

const mapStateToProps = (state: RootState, ownProps: IEditProfilePageProps) => { // mapStateToProps brings the profile in from our initialState (defined and updated in the reducer)
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn // Logged in is also brought in just in case our user logs our from this page
  };
};

export default connect(mapStateToProps, { updateProfile, logOut })( // connect 'connects' this component(EditProfilePage.tsx) with our store and 'connects' the reducer functions 'updateProfile and logOut'.
  EditProfilePage // This exports our connected component(EditProfilePage.tsx) with the store linked to it.
);
