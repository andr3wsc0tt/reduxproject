import * as React from 'react';
import { Divider,Button, Form, Grid, Header, Segment, Container, Input,} from 'semantic-ui-react'
export interface IHomeProps {
}
export default class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      
      <Grid columns='equal'>
      <Grid.Row >
        <Grid.Column></Grid.Column>
        <Grid.Column></Grid.Column>
        <Grid.Column floated='right'> 
            <Input fluid icon='user' iconPosition='left' placeholder='Username' />
            </Grid.Column >
            <Grid.Column floated='right'>
            <Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
</Grid.Column>
<Grid.Column floated='right'>
            <Button color='yellow' fluid size='large'>
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
