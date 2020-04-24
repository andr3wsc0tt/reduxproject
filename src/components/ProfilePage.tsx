import * as React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { Profile } from "../store/types/types";
import { logOut } from "../store/actions/actions";

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
import {IUser} from "../models/IUser";
import About from "./EditProfilePage";


export interface IProfilePageProps {
  match: any;
  profiles: Profile[];
  logOut: typeof logOut;
}

export interface IProfilePageState {
  users: IUser[]
}


export class ProfilePage extends React.Component<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    super(props);

      this.state = {
        users: [ 
          {
            userName: "",
            passWord: "", 
            signUpPass: "", 
            signUpUser: ""
         }
       ] 
     }
   }

public render() {
  let { users } = this.state;
  
  return(
    <React.Fragment>
      ProfilesPages
      {users.map (individualUser => (
        ProfilePage user= {individualUser}/>
        
       ))
      }
    </React.Fragment>
  )
}



  loggedOut = () => {
    let { logOut, profiles } = this.props;

    let uName = profiles.filter(profile => profile.loggedIn == true);

    logOut(uName[0]);
    sessionStorage.setItem(
      "profiles",
      JSON.stringify({ profiles: profiles, loggedin: "false" })
    );
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.setItem("userName", ""); // username of the person who is logged in
    console.log(profiles);
  };

  public render() {
    let { profiles } = this.props;
    let who = profiles[0].name;
    console.log(profiles);

    let uName = profiles.filter(
      profile => profile.name === sessionStorage.getItem("userName"));

    console.log(uName, "The User Profile Object");
    console.log(uName[0].aboutMe, "The User About Me string");

    let {aboutMe, name, password, id, loggedIn} = uName[0];

    // for each profile in profiles:
    // check profile.name == sessionStorage.getItem("userName");
    // let who = matched_profile.name;

    return (
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
              <Container fluid>
                <Header as="h1"> Explore </Header>

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
              <Calendar />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <h2>Welcome {who}!</h2>
        <h3>About Me: {uName[0].aboutMe}</h3>
        <button onClick={this.loggedOut}>Log Out</button>
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
