import * as React from 'react';
import { Divider,Button, Form, Grid, Header, Segment, Container,Input} from 'semantic-ui-react'
import {checkPass} from '../store/actions/actions'
import {ProfileActionTypes, Profile} from '../store/types/types'
import { RootState } from '../store';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ProfilePage from './ProfilePage';

export interface IHomeProps {
  checkPass: typeof checkPass,
  profiles: Profile[],
  loggedIn: boolean,
  location?: Router
}

export interface IHomeState{
  userName: string,
  passWord: string
}

export class Home extends React.Component<IHomeProps, IHomeState> {

  constructor(props: IHomeProps){
    super(props);
    this.state = {userName: "", passWord: ""};
  }

  handleUserChange = (e : React.FormEvent<HTMLInputElement> ) => {
    this.setState({userName : e.currentTarget.value})
  }

  handlePassChange = (e : React.FormEvent<HTMLInputElement> ) => {
    this.setState({passWord : e.currentTarget.value})
  }

  handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    event.preventDefault();
    let {userName, passWord} = this.state;
    let {profiles, checkPass, loggedIn} = this.props;

    let cred : Array<string> = [userName, passWord];
    checkPass(cred);
    this.setState({userName : "", passWord: ""});

}

  public render() {
    let {loggedIn, profiles } = this.props;
    console.log(loggedIn);
    if (loggedIn === true || sessionStorage.getItem('loggedIn') == 'true'){
      const uName = profiles.filter(profile => profile.loggedIn == true);
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userName', uName[0].name);
      return (
        <>
        <Router>
        <Redirect to={`/profile/${uName[0].name}`}/>
        <Link to="" component={ProfilePage}/>
      </Router>
      </>
      )
    }
    return (
      
      <Grid columns='equal'>
      <Grid.Row >
        <Grid.Column></Grid.Column>
        <Grid.Column></Grid.Column>
        <Grid.Column floated='right'> 
            <Input fluid icon='user' iconPosition='left' placeholder='Username'  value={this.state.userName} onChange={this.handleUserChange} />
            </Grid.Column >
            <Grid.Column floated='right'>
            <Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={this.state.passWord} 
              onChange={this.handlePassChange}
            />
</Grid.Column>
<Grid.Column floated='right'>
            <Button color='yellow' fluid size='large' onClick={this.handleOnClick}>
              Login
            </Button>
</Grid.Column>
        </Grid.Row>
        <Divider horizontal>-</Divider>
        <Grid.Row>
        <Grid.Column >
        <Container fluid>
      <Header as='h2'>TECHCareers Hive</Header>
      <p>
        Connect with classmates and techcareers alumni.
      </p>
    </Container>
        </Grid.Column>
<Grid.Column>        <Divider vertical>Or</Divider>
</Grid.Column>
        <Grid.Column > 
        <Header as='h2' color='green' textAlign='center'>
         Sign -Up
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
                <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='confirm-Password'
              type='password'
            />
            <Button color='green' fluid size='large'>
              SignUp
            </Button>
          </Segment>
        </Form>
        </Grid.Column>
        </Grid.Row>
    </Grid>
    
    );
  }
}

const mapStateToProps = (state: RootState, ownProps : IHomeProps) => {
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn
  }
}

export default connect(
  mapStateToProps,
  {checkPass},
)(Home);
