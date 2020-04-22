import * as React from 'react';
import { Grid, Input, Divider, Container, Header, Radio, Form, Segment, TextArea, Button } from 'semantic-ui-react';

export interface IAboutProps {
    match : any
}

export default class About extends React.Component<IAboutProps> {

  public render() {
    return(
    <Grid columns='equal'>
      <Grid.Row >
        <Grid.Column width={5}></Grid.Column >
         <Grid.Column ></Grid.Column>
          <Grid.Column  color='yellow' >
         
             <Input action='Search' placeholder='Search TechCareers Hive' size='huge' />
      </Grid.Column>
        </Grid.Row>
        <Divider horizontal>techcareers hive </Divider>
        <Grid.Row>
          
        <Grid.Column >
          
        <Container fluid>
      <Header as='h1'> <i className="user circle icon"></i></Header>

      <Radio as='h3' label='Education' defaultChecked /><br></br>
      <Radio label='Events' defaultChecked /><br></br>
      <Radio label='Photos' defaultChecked /><br></br><br></br><br></br>
      Groups<br></br>
      <Radio label='JavaScript' defaultChecked />

    </Container>
        </Grid.Column>
<Grid.Column>        <Divider vertical></Divider>
</Grid.Column>


        <Grid.Column > 
        <Header as='h2' color='green' textAlign='center'>
        Edit profile
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='home' iconPosition='left' placeholder='Current City' />
            <Form.Input
              fluid
              icon='users'
              iconPosition='left'
              placeholder='Cohort'
              type='text'
            />
                <Form.Input
              fluid
              icon='language'
              iconPosition='left'
              placeholder='Spoken Languages'
              type='text'
            />
             <Form.Input
              fluid
              icon='code'
              iconPosition='left'
              placeholder='Programming Languages'
              type='text'
              
            />
             <Form.Field
          control={TextArea}
          label='About'
          placeholder='Tell us more about you...'
        />
            <Button color='green' >
              Save Changes
            </Button>
          </Segment>
        </Form>
        </Grid.Column>
        </Grid.Row>
    </Grid>
    );
  }
}