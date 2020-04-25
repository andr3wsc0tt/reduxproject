import * as React from "react";
import '../../src/App.css';
import {
  Divider,
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Input,
  Icon,
  Image
} from "semantic-ui-react";

import { checkPass, addProfile } from "../store/actions/actions";

import { ProfileActionTypes, Profile } from "../store/types/types";
import { RootState } from "../store";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import NavBar from "./subcomponents/NavBar";

export interface IHomeProps { // our store state variables
  checkPass: typeof checkPass; // reducer
  addProfile: typeof addProfile; // reducer
  profiles: Profile[]; // our users
  loggedIn: boolean; // a state variable
  location?: Router;
}

export interface IHomeState { // Our local state variables that change as we input either our login and password, or our new user information.
  userName: string; // username for login
  passWord: string;
  signUpUser: string; // sign up username
  signUpPass: string;
}

export class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = { userName: "", passWord: "", signUpPass: "", signUpUser: "" };
  }
 
  // the 4 functions (methods) below update our form fields as the user inputs them
  handleUserChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ userName: e.currentTarget.value });
  };

  handlePassChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ passWord: e.currentTarget.value });
  };

  handleSignUserChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ signUpUser: e.currentTarget.value });
  };

  handleSignPassChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ signUpPass: e.currentTarget.value });
  };


  // This is our login method that call the checkPass REDUCER!
  handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    let { userName, passWord } = this.state; // our local state login and password
    let { profiles, checkPass, loggedIn } = this.props; // our store variables and reducers that are passed from mapStateToProps and connect!

    let cred: Array<string> = [userName, passWord]; // Our reducer (checkPass) takes in a string[]...so a ['username', 'password'] array
    checkPass(cred); // a REDUCER!

    this.setState({ userName: "", passWord: "" }); // Resets our local state username and password
  };

  handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { // our sign up function that calls our addProfile REDUCER!
    e.preventDefault();

    let { signUpPass, signUpUser } = this.state; // info put into form
    let { addProfile, profiles } = this.props; // store variables and reducers
    let duplicated: boolean = false;

    profiles.forEach((profile, i) => { // Go through each profile in the store's profiles
      if (profile.name == signUpUser) { // Check if that profile has the same name as the text entered in the sign up field
        duplicated = true; // if the text entered in the sign up field matches a name in the store's profile array, set duplicated to true (Tell the function that you found a user that already has that name)
      }
    });

    if (duplicated == false) { // if you didn't find a user with the same name that was entered in the sign up input box
      addProfile({ //add that user to the stores profile array using the addProfile REDUCER!
        // reducer/action
        id: 2,
        name: signUpUser,
        password: signUpPass,
        aboutMe: "",
        loggedIn: true,
        city: "",
        cohort: "",
        programming: "",
        spoken: ""
      });
    }

    this.setState({ signUpUser: "", signUpPass: "" }); // Reset the local state variables
  }; 
  public render() {
    
    let { loggedIn, profiles } = this.props; // Get the store's initial state's loggedIn variable and profile array

    if (loggedIn === true || sessionStorage.getItem("loggedIn") == "true") { // if the store's loggedIn variable is set, or the sessionState loggedIn variable is set then we can set up our Router for moving to the appropriate page
      sessionStorage.setItem("profiles", JSON.stringify(profiles)); // save the sessionStorage profiles (not sure if this is necessary)
      let userName = sessionStorage.getItem("userName"); // save the sessionStorage username 
      let uName = profiles.filter(profile => profile.loggedIn == true); // find the profile of the user that is logged in

      let destString = ""; // intialize null string for the Redirect Route

      if (loggedIn == true) { // If a user is logged in through the store state
        sessionStorage.setItem("userName", uName[0].name); // save to global
        sessionStorage.setItem("loggedIn", "true"); // save to global
        destString = uName[0].name; // set the destination for Redirect Route to the name of the logged in User
      } else if (userName != undefined) { // if the global username is set
        sessionStorage.setItem("userName", userName); // I dont think this is necessary
        destString = userName; // set the destination for Redirect Route to the name of the sessionStorage username
      }

      return ( // If the user is logged in, take them to the profile page
        <>
          <Router>
            {/* Redirect to the /profile/ page with their username == destString */}
            <Redirect to={`/profile/${destString}`} /> 
            {/* Render the ProfilePage component */}
            <Link to="" component={ProfilePage} /> 
          </Router>
        </>
      );
    }
    else{
      sessionStorage.setItem("profiles", JSON.stringify(profiles)); // save the sessionStorage profiles (not sure if this is necessary)
    }
    return ( // If the user isn't logged in, render the HomePage
      <Segment>
  
      <Grid columns="equal">
        <Grid.Row>
        <div>
    <Image src='Logo.png'  height='150' width='250' circular/>
    <span></span>
  </div>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column floated="right"><br></br><br></br>
            <Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={this.state.userName}
              onChange={this.handleUserChange}
            />
          </Grid.Column>
          <Grid.Column floated="right"><br></br><br></br>
            <Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={this.state.passWord}
              onChange={this.handlePassChange}
            />
          </Grid.Column>
          <Grid.Column floated="right"><br></br><br></br>
            <Button
              color="yellow"
              fluid
              size="large"
              onClick={this.handleOnClick}
            >
              Login
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Divider horizontal>Techcareers hive</Divider>
        <Grid.Row>
          <Grid.Column>
            <Container fluid>
              <Header as="h2">TECHCareers Hive</Header><br></br>
              <p>Connect with classmates and techcareers alumni.</p>
              <p>Join groups of your interest.</p>
              <p>Check networking events.</p>
              <p>AND More!!!!!!!.</p>
            </Container>
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Divider vertical>  <Icon loading name='forumbee' size='massive' color='yellow' /> </Divider>
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" color="green" textAlign="center">
              Sign -Up
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="username"
                  value={this.state.signUpUser}
                  onChange={this.handleSignUserChange}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="confirm-Password"
                  type="password"
                  value={this.state.signUpPass}
                  onChange={this.handleSignPassChange}
                />
                <Button
                  color="green"
                  fluid
                  size="large"
                  onClick={this.handleSignUp}
                >
                  SignUp
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
         
        </Grid.Row>
   
      </Grid>
     
      </Segment>
      
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: IHomeProps) => { // mapStateToProps connects our store with this component
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn
  };
};

export default connect(mapStateToProps, { checkPass, addProfile })(Home); // connect loads in the checkPass and addProfile REDUCERS!. It also exports our Component with the store connected
