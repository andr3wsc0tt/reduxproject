import * as React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { Profile } from "../store/types/types";
import { logOut } from "../store/actions/actions";
import EditProfilePage from "./EditProfilePage";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import {
  Image,
  Segment,
  Grid,
  Dropdown,
  Container,
  Header,
  Radio,
  Form,
  TextArea,
  Icon,
  Button
} from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {IUser} from "../models/IUser";
import About from "./EditProfilePage";


export interface IProfilePageProps { // Variables passed in from the store state
  match: any;
  profiles: Profile[];
  logOut: typeof logOut;
}

export interface IProfilePageState { // our local state variables
  redirect: boolean;
}

export class ProfilePage extends React.Component<
  IProfilePageProps,
  IProfilePageState
> {
  constructor(props: IProfilePageProps) {
    super(props);
    this.state = { redirect: false };
  }
  

  
  loggedOut = () => { // The function that calls our logOut REDUCER!
    let { logOut, profiles } = this.props; // The store states logOut REDUCER and profiles array

    let uName = profiles.filter(profile => profile.loggedIn === true); // filter through the profiles array and return any profile that has it's loggedIn field set to true.

    logOut(uName[0]); // Pass the profile to the logOut REDUCER! It takes in a Profile[] as it's payload.

    // When we log out we want to save our global state (This might not be necessary anymore)
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.setItem("userName", ""); // username of the person who is logged in
    window.location.href = "/";
  };

  handleRedirect = () => { // This sets our local state variable that determines if we go to the Edit Profile Page
    this.setState({ redirect: true }); 
  };

  public render() {
    let { profiles } = this.props; // load in the profiles from the store state


    let uName = profiles.filter(profile => profile.loggedIn == true); // find out who user is logged in
    let { aboutMe, name, password, id, loggedIn, city, spoken, programming, cohort } = uName[0]; // Deconstructing the current user's store profile fields


    if (this.state.redirect === true) { // If we are wanting to redirect to the Edit Profile Page
      return (
        <Router> 
          {/* Render the EditProfilePage */}
          <Link to="" component={EditProfilePage} />
          
          {/* Redirect the URL to /edit-profile/**name of the Logged in User** */}
          <Redirect to={`/edit-profile/${name}`} />
        </Router>
      );
    }

    return ( // If there is no redirect request. Render the Profile Page
      <Segment>
        <Grid divided="vertically">
          
          <Grid.Row columns={5}>
            <Grid.Column></Grid.Column>
            <Grid.Column floated="right">
              <Dropdown text="Groups">
                <Dropdown.Menu>
                  <Dropdown.Item text="Group 1" />
                  <Dropdown.Item text="Group 2" />
                  <Dropdown.Item text="Group 3" />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column>
              <Dropdown text="Class Mates">
                <Dropdown.Menu>
                  <Dropdown.Item text="Andrew" />
                  <Dropdown.Item text="Charles" />
                  <Dropdown.Item text="Cai" />
                  <Dropdown.Item text="Trina" />
                  <Dropdown.Item text="Mohammad" />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
                <h3>Current city:{city}</h3>
                <h3>Cohort:{cohort}</h3>
                <h3>Spoken languages:{spoken}</h3>
                <h3>Programming languages interested in:{programming}</h3>
                <h3>About Me: {aboutMe}</h3>
              <Container fluid>

                <br></br>
                <Header as="h3"> Explore </Header>


                <Radio as="h2" label="Networking Events" defaultChecked />
                <br></br>
                <Radio as="h2" label="Previous Cohorts" defaultChecked />
                <br></br>
                <Radio as="h2" label="Groups" defaultChecked />
                <br></br>
                <Radio as="h2" label="Additional Resources" defaultChecked />
                <br></br>
                <Radio as="h2" label="Linkedin" defaultChecked />
              </Container>
            </Grid.Column>
            <Grid.Column>
            <h2>Welcome {name}!</h2>
              <Form>
                <Segment>
                  <TextArea
                    placeholder="Create a Post"
                    style={{ minHeight: 150 }}
                  />
                  <Segment>
                    {" "}
                    <Button icon>
                    <Icon name = "photo" color="green" />Photo
                     </Button>

                    <Button icon>
                    <Icon name="user outline" color="green"/>Tag a Class Mate
                     </Button> 
                  </Segment>
                </Segment>
              </Form>{" "}
              <br></br>
              <Form>
                <Segment>
                  <TextArea
                    placeholder="Ask a question"
                    style={{ minHeight: 150 }}
                  />
                  <Segment>
                    {" "}
                    <Button icon>
                    <Icon name = "image outline" color="green" />Screen Shot
                     </Button>
                     <Button icon>
                    <Icon name = "file code outline" color="green" />Group
                     </Button>
                  </Segment>
                </Segment>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Calendar />
              <br></br>
              <br></br>
              <Button.Group>
    <Button color="green" onClick={this.handleRedirect}>
      Edit Profile
    </Button>
    <Button.Or/>
    <Button color="yellow" onClick={this.loggedOut}>
      Save
      </Button>
  </Button.Group>
              
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: IProfilePageProps) => { // mapStateToProps connects the store's initial state variables with ProfilePage component
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn
  };
};

export default connect(mapStateToProps, { logOut })(ProfilePage); // connect imports the logOut REDUCER from our store and returns our connected our ProfilePage component 
