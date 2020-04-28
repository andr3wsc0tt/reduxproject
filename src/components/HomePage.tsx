import * as React from "react";
import "./main.css";
import {
  Divider,
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Icon,
  Responsive
} from "semantic-ui-react";

import { checkPass, addProfile } from "../store/actions/actions";

import { Profile } from "../store/types/types";
import { RootState } from "../store";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ProfilePage from "./ProfilePage";

// our store state variables
export interface IHomeProps {
  // reducer
  checkPass: typeof checkPass;
  // reducer
  addProfile: typeof addProfile;
  // our users
  profiles: Profile[];
  // a state variable
  loggedIn: boolean;
  location?: Router;
}

// Our local state variables that change as we input either our login and password, or our new user information.
export interface IHomeState {
  // Login forms
  userName: string;
  passWord: string;

  // Sign up form
  signUpUser: string;
  signUpPass: string;
  confirmSignUpPass: string

  // Warning messages
  loginMessage: string
  signupMessage: string
}

export class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = { userName: "", passWord: "", signUpPass: "", signUpUser: "" , loginMessage: "", signupMessage: "", confirmSignUpPass: ""};
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

  handleConfirmSignPassChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ confirmSignUpPass: e.currentTarget.value });
  };

  handleSignPassChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ signUpPass: e.currentTarget.value });
  };


  // This is our login method that call the checkPass REDUCER!
  handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    // our local state login and password
    let { userName, passWord} = this.state;
    // our store variables and reducers that are passed from mapStateToProps and connect!
    let { checkPass, profiles } = this.props;
    // Our reducer (checkPass) takes in a string[]...so a ['username', 'password'] array
    let cred: Array<string> = [userName, passWord];
    // a REDUCER!

    let uName = profiles.filter((profile) => profile.name === userName);

    if (uName.length === 0)
      this.setState({loginMessage : "Incorrect Username or Password"})

    if (uName.length > 0 && uName[0].password !== passWord)
      this.setState({loginMessage : "Incorrect Username or Password"})


    checkPass(cred);

    // Resets our local state username and password
    this.setState({ userName: "", passWord: "" });
  };

  // our sign up function that calls our addProfile REDUCER!
  handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // info put into form
    let { signUpPass, signUpUser, confirmSignUpPass } = this.state;
    // store variables and reducers
    let { addProfile, profiles } = this.props;
    // variable to check is a user by that name already exists
    let duplicated: boolean = false;
    // Go through each profile in the store's profiles
    profiles.forEach((profile, i) => {
      // Check if that profile has the same name as the text entered in the sign up field
      if (profile.name === signUpUser) {
        // if the text entered in the sign up field matches a name in the store's profile array, set duplicated to true (Tell the function that you found a user that already has that name)
        duplicated = true;
      }
    });
    // if you didn't find a user with the same name that was entered in the sign up input box
    if (confirmSignUpPass !== signUpPass && duplicated === false){
      this.setState({ signupMessage: "Passwords don't match" });
    }
    else{
      if (duplicated === false) {
        //add that user to the stores profile array using the addProfile REDUCER!
        addProfile({
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
      else{
        this.setState({ signupMessage: "Username already exists" });
      }
    }

    // Reset the local state variables
    this.setState({ signUpUser: "", signUpPass: "", confirmSignUpPass: "" });
  };


  componentDidUpdate(){
    // Get the store's initial state's loggedIn variable and profile array
    let { loggedIn, profiles } = this.props;
    // if the store's loggedIn variable is set, or the sessionState loggedIn variable is set then we can set up our Router for moving to the appropriate page
    if (loggedIn === true || sessionStorage.getItem("loggedIn") === "true") {
      // save the sessionStorage profiles (not sure if this is necessary)
      sessionStorage.setItem("profiles", JSON.stringify(profiles));
      // save the sessionStorage username
      let userName = sessionStorage.getItem("userName");
      // find the profile of the user that is logged in
      let uName = profiles.filter(profile => profile.loggedIn === true);
      // intialize null string for the Redirect Route
      // If a user is logged in through the store state
      if (loggedIn === true) {
        // save to global
        sessionStorage.setItem("userName", uName[0].name);
        // save to global
        sessionStorage.setItem("loggedIn", "true");
        // set the destination for Redirect Route to the name of the logged in User
        // if the global username is set
      } else if (userName !== null) {
        sessionStorage.setItem("userName", userName);
        // set the destination for Redirect Route to the name of the sessionStorage username
      }

    } else {
      // save the sessionStorage profiles (not sure if this is necessary)
      sessionStorage.setItem("profiles", JSON.stringify(profiles));

    }
  }


  public render() {
    let { loggedIn, profiles } = this.props;
    let {loginMessage, signupMessage} = this.state;
    if (loggedIn === true || sessionStorage.getItem("loggedIn") === "true") {
      let uName = profiles.filter(profile => profile.loggedIn === true); // find out who user is logged in

      // On first log in or sign up the sessionStorage will not have been set, so get the destString from the store's update profile
      let destString = sessionStorage.getItem("userName") ? sessionStorage.getItem("userName") : uName[0].name;

      return (
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

    // If the user isn't logged in, render the HomePage
    return (
      <Segment>
        <Grid stackable columns="equal">
          <Grid.Row>
            <div className="thumb">
              <button>
                <span>TechCareers Hive</span>
              </button>
            </div>
            <Responsive as={Grid.Column} minWidth={768}></Responsive>

            {/* <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column> */}
            <Grid.Column floated="right" className="floated-dissapear">
              <br></br>
              <br></br>
              <Form >
                <Form.Group>
              <Form.Input
                icon="user"
                iconPosition="left"
                className="login-name"
                placeholder="Username"
                width={5}
                value={this.state.userName}
                onChange={this.handleUserChange}
              />
              <Form.Input
                icon="lock"
                width={5}
                className="login-pass"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.passWord}
                onChange={this.handlePassChange}
              />
              <Button
                type="submit"
                color="yellow"
                size="large"
                className="login-button"
                onClick={this.handleOnClick}
              >
                Login
              </Button>
              </Form.Group>
              </Form>
            </Grid.Column>
            <span>{loginMessage}</span>
          </Grid.Row>
          
          {/* <div id="animated_div">Techcareers HIVE</div> */}
          
          <Divider horizontal>
            {" "}
            <div className="sk-wave">
              <div className="sk-wave-rect">T</div>
              <div className="sk-wave-rect">e</div>
              <div className="sk-wave-rect">c</div>
              <div className="sk-wave-rect">h</div>
              <div className="sk-wave-rect">C</div>
              <div className="sk-wave-rect">a</div>
              <div className="sk-wave-rect">r</div>
              <div className="sk-wave-rect">e</div>
              <div className="sk-wave-rect">e</div>
              <div className="sk-wave-rect">r</div>
              <div className="sk-wave-rect">s</div>
              <div className="sk-wave-rect">H</div>
              <div className="sk-wave-rect">I</div>
              <div className="sk-wave-rect">V</div>
              <div className="sk-wave-rect">E</div>
            </div>
          </Divider>
          <Grid.Row>
          <Responsive as={Grid.Column} minWidth={768}>
            {/* <Grid.Column> */}
              <Container fluid>
                <Header as="h2">TECHCareers Hive</Header>
                <br></br>
                <p>Connect with classmates and techcareers alumni.</p>
                <p>Join groups of your interest.</p>
                <p>Check networking events.</p>
                <p>AND More!!!!!!!.</p>
              </Container>
              </Responsive>
            {/* </Grid.Column> */}
            <Grid.Column>
              {" "}
              <Divider vertical>
                {" "}
                <Icon
                  loading
                  name="forumbee"
                  size="massive"
                  color="yellow"
                />{" "}
              </Divider>
            </Grid.Column>
            
            <Grid.Column>
              <Header as="h2" color="green" textAlign="center">
                Sign -Up
              </Header>
              <span>{signupMessage}</span>
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
                    value={this.state.confirmSignUpPass}
                    onChange={this.handleConfirmSignPassChange}
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

// mapStateToProps connects our store with this component
const mapStateToProps = (state: RootState, ownProps: IHomeProps) => {
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn
  };
};

// connect loads in the checkPass and addProfile REDUCERS!. It also exports our Component with the store connected
export default connect(mapStateToProps, { checkPass, addProfile })(Home);