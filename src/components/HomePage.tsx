import * as React from "react";

import {
  Divider,
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Input
} from "semantic-ui-react";
import { checkPass, addProfile } from "../store/actions/actions";

import { ProfileActionTypes, Profile } from "../store/types/types";
import { RootState } from "../store";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import NavBar from "./subcomponents/NavBar";

export interface IHomeProps {
  checkPass: typeof checkPass;
  addProfile: typeof addProfile;
  profiles: Profile[];
  loggedIn: boolean;
  location?: Router;
}

export interface IHomeState {
  userName: string;
  passWord: string;
  signUpUser: string;
  signUpPass: string;
}

export class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = { userName: "", passWord: "", signUpPass: "", signUpUser: "" };
  }

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

  handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    let { userName, passWord } = this.state;
    let { profiles, checkPass, loggedIn } = this.props;

    let cred: Array<string> = [userName, passWord];
    checkPass(cred);
    this.setState({ userName: "", passWord: "" });
  };

  handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    let { signUpPass, signUpUser } = this.state; // info put into form
    let { addProfile, profiles } = this.props;
    let duplicated : boolean = false;
    
    profiles.forEach((profile, i) => {
      if (profile.name == signUpUser) {
        duplicated = true;
      }
    });

    if(duplicated == false){
      console.log("WRONG MATCH");
      addProfile({ // reducer/action 
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

    this.setState({ signUpUser: "", signUpPass: "" });
  };
  public render() {
    let { loggedIn, profiles } = this.props;

    if (loggedIn === true || sessionStorage.getItem("loggedIn") == "true") {
      sessionStorage.setItem(
        "profiles",
        JSON.stringify(profiles)
      );
      let userName = sessionStorage.getItem("userName");
      let uName = profiles.filter(profile => profile.loggedIn == true);

      let destString = "";

      if (loggedIn == true) {
        sessionStorage.setItem("userName", uName[0].name);
        sessionStorage.setItem("loggedIn", "true");
        destString = uName[0].name;
      } else if (userName != undefined) {
        sessionStorage.setItem("userName", userName);
        destString = userName;
      }

      return (
        <>
          <Router>
            <Redirect to={`/profile/${destString}`} />
            <Link to="" component={ProfilePage} />
          </Router>
        </>
      );
    }
    return (
      <Segment>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column floated="right">
            <Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={this.state.userName}
              onChange={this.handleUserChange}
            />
          </Grid.Column>
          <Grid.Column floated="right">
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
          <Grid.Column floated="right">
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
              <Header as="h2">TECHCareers Hive</Header>
              <p>Connect with classmates and techcareers alumni.</p>
            </Container>
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Divider vertical>Or</Divider>
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

const mapStateToProps = (state: RootState, ownProps: IHomeProps) => {
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn
  };
};

export default connect(mapStateToProps, { checkPass, addProfile })(Home);
