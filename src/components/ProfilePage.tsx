import * as React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { Profile } from "../store/types/types";
import { logOut } from "../store/actions/actions";
import EditProfilePage from './EditProfilePage';

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
import { Link } from "react-router-dom";

export interface IProfilePageProps {
  match: any;
  profiles: Profile[];
  logOut: typeof logOut;
}

export class ProfilePage extends React.Component<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    super(props);
    this.state = { userName: "", passWord: "", signUpPass: "", signUpUser: "" };
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
        <h2>Welcome {who}!</h2>
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
              
              {/* <Link to={`/edit-profile/${who}`} component={EditProfilePage}>Edit</Link> */}
              <Link to={`/edit-profile/${who}`} onClick={() => setTimeout(()=>window.location.reload(), 5)}><Button>Edit profile</Button></Link>

       
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
