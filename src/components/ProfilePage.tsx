import * as React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { Profile } from "../store/types/types";
import { logOut } from "../store/actions/actions";
import EditProfilePage from './EditProfilePage';
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
  Button
} from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


export interface IProfilePageProps {
  match: any;
  profiles: Profile[];
  logOut: typeof logOut;
}

export interface IProfilePageState {
  redirect : boolean
}

export class ProfilePage extends React.Component<IProfilePageProps, IProfilePageState> {
  constructor(props: IProfilePageProps) {
    super(props);
    this.state = { redirect: false };
  }

  loggedOut = () => {
    let { logOut, profiles } = this.props;

    let uName = profiles.filter(profile => profile.loggedIn == true);

    logOut(uName[0]);
    sessionStorage.setItem(
      "profiles",
      JSON.stringify( profiles)
    );
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.setItem("userName", ""); // username of the person who is logged in
    console.log(profiles);
  };


  handleRedirect = () =>{
    this.setState({redirect: true});
  }

  public render() {
    let { profiles } = this.props;

    let uName = profiles.filter(
      profile => profile.name === sessionStorage.getItem("userName"));

    console.log(uName, "The User Profile Object");
    console.log(uName[0].aboutMe, "The User About Me string");

    let {aboutMe, name, password, id, loggedIn} = uName[0];

    if (this.state.redirect === true) {
      return (
      <Router>
        <Link to="" component={EditProfilePage} />
        <Redirect to={`/edit-profile/${name}`} />
      </Router>
      )
    }

    return (
      <Segment>
        <Grid divided="vertically">
        <h2>Welcome {name}!</h2>
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
            <h3>About Me: {aboutMe}</h3>
              <Container fluid><br></br>
                <Header as="h4"> Explore </Header>

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
              <Form>
                <Segment>
                  <TextArea
                    placeholder="Create a Post"
                    style={{ minHeight: 150 }}
                  />
                  <Segment>
                    {" "}
                    <Button content="Photos" />
                    <Button content="tag a classmate" />
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
                    <Button content="Screen Snippet" />
                    <Button content="Group" />
                  </Segment>
                </Segment>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Calendar /><br></br>

              <Button color='green' onClick={this.handleRedirect}>Edit Profile</Button>

        <Button color='red' onClick={this.loggedOut}>Log Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
       
      </Segment>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: IProfilePageProps) => {
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn
  };
};

export default connect(mapStateToProps, { logOut })(ProfilePage);
