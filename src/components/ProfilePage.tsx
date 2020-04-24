import * as React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { Profile } from "../store/types/types";
import { logOut } from "../store/actions/actions";
import idGenerator from "react-id-generator";

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
            signUpUser: "",
            About: "",
            id: 0
         }
       ] 
     }
   }
   
   componentDidMount() {
    
    this.setState({
      users: users.map(e => {
        return {
          userName: e.userName,
          userLastName: e.userName,
          passWord: e.passWord,
          signUpPass:e.signUpPass,
          About: e.About,
          id: idGenerator()
        };
      })
    });
  }
  

  handleChange = e => {
    const userName = e.target.userName;
    this.setState({ [userName]: e.target.value });
  };

  handleCreateUser = () => {
    if (this.state.users) {
      this.setState({
        users: [
          ...this.state.users,
          {
            userName: this.state.userName,
            userLastName: this.state.,
            id: idGenerator()
          }
        ]
      });
    } else {
      this.setState({
        users: [
          {
            firstname: this.state.userName,
            userLastName: this.state.userLastName,
            id: idGenerator()
          }
        ]
      });
    }
    this.setState({ userName: "", LastName: "" });
  };

  handleEdit = e => {
    const employee = this.state.users.find(function(user) {
      if (user.id === e.target.id) {
        return user;
      }
    });

    this.setState({
      userName: user.userName,
      userLastName: user.userLastName,
      id: user.id,
      create: false
    });
  };
  handleDelete = e => {
    this.setState({
      users: this.state.users.filter(function(user) {
        if (user.id !== e.target.id) return user;
      })
    });
  };
  handleUpdateEmployee = () => {
    const user = {
      userName: this.state.userName,
      userLastName: this.state.userLastName,
      id: this.state.id
    };
    const usersUpdated = this.state.users.map(user => {
      if (user.id === this.state.id) {
        return user;
      } else return user;
    });

    this.setState((prevStae, props) => ({
      user: userUpdated,
      create: true,
      userName: "",
      userLastName: ""
    }));
  };

   /* render() {
      const create = this.state.create ? "Save" : "Update";
      const { users } = this.state;
      const inputIsEmpty =
        this.state.userName === "" || this.state.userLastName === "" ? true : false;
      return (
        <div>
          <input
            style={{ width: 120 }}
            type="text"
            placeholder="Enter username"
            onChange={this.handleChange}
            name="Username"
            value={this.state.userName}
          />
          <input
            style={{ width: 120 }}
            type="text"
            placeholder="Enter Firstname"
            onChange={this.handleChange}
            name="User Lastname"
            value={this.state.userLastName}
          />

          <button
            style={{ width: 150 }}
            disabled={inputIsEmpty}
            onClick={
              this.state.create
                ? this.handleCreateUser
                : this.handleUpdateEmployee
            }
          >
            {create}
            
          </button>
          <br />
          <table border="1" style={{ width: 400, paddingTop: 5 }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user.userName}</td>
                    <td>{user.userLastName}</td>
                    <td>
                      <button onClick={this.handleEdit} id={user.id}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={this.handleDelete} id={user.id}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }*/

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
