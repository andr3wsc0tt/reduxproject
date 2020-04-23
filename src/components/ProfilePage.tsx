import * as React from 'react';
import { RootState } from '../store';
import { connect } from 'react-redux';
import {Profile} from '../store/types/types'
import { Segment, Grid, Dropdown, Container, Header, Radio, Form, TextArea, Button } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export interface IProfilePageProps {
  match: any,
  profiles: Profile[]
}

export class ProfilePage extends React.Component<IProfilePageProps> {
  public render() {
    let {match, profiles} = this.props;
    let who = profiles[0].name;
    let about = profiles[0].aboutMe;


    return (
      <Segment>
      <Grid divided='vertically'>
    <Grid.Row columns={5}>
    <Grid.Column></Grid.Column>
      <Grid.Column floated='right'>
      <Dropdown text='Groups'>
    <Dropdown.Menu>
      <Dropdown.Item text='Group 1' />
      <Dropdown.Item text='Group 2' />
      <Dropdown.Item text='Group 3' />
      
    </Dropdown.Menu>
       </Dropdown>
      </Grid.Column>
      <Grid.Column>
      <Dropdown text='Class Mates'>
    <Dropdown.Menu>
      <Dropdown.Item text='Andrew' />
      <Dropdown.Item text='Charles' />
      <Dropdown.Item text='Cai' />
      <Dropdown.Item text='Trina' />
      <Dropdown.Item text='Mohammad' />
   </Dropdown.Menu>
  </Dropdown>
      </Grid.Column>
    </Grid.Row>
    
    <Grid.Row columns={3}>
      <Grid.Column>
      <Container fluid>
      <Header as='h1'> Explore </Header>

      <Radio as='h2' label='Networking Events' defaultChecked /><br></br>
      <Radio as='h2'label='Previous Cohorts' defaultChecked /><br></br>
      <Radio as='h2'label='Groups' defaultChecked /><br></br>
      <Radio as='h2'label='Additional Resources' defaultChecked /><br></br>
      <Radio as='h2'label='Linkedin' defaultChecked />

    </Container>
      </Grid.Column>
      <Grid.Column>
      <Form>
        <Segment>
    <TextArea placeholder='Create a Post' style={{ minHeight: 150 }} />
      <Segment> <Button content='Photos'/><Button content='tag a classmate'/></Segment></Segment>
  </Form> <br></br>
  <Form>
        <Segment>
    <TextArea placeholder='Ask a question' style={{ minHeight: 150 }} />
      <Segment> <Button content='Screen Snippet'/><Button content='Group'/></Segment></Segment>
  </Form>
  
      </Grid.Column>
      <Grid.Column>

      <Calendar />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps : IProfilePageProps) => {
  return {
    profiles: state.profile.profiles
  }
}

export default connect(
  mapStateToProps,
)(ProfilePage);