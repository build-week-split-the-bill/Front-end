import React from 'react'
import { useInput } from "./useInput.js";
//import { useLocalStorage } from "./UseLocalStorage.js";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


export default function Login(){
  const [password, setPassword, handlePassword] = useInput("", "password");
const [email, setEmail, handleEmail] = useInput("", "email");

function handleSubmit(event) {
    event.preventDefault();
    setPassword(password);
    setEmail(email);
  }
  return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         Log-in to your account
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' type= 'email' value={email} onChange={handleEmail}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value= {password}
            onChange={handlePassword}
          />

          <Button color='purple' fluid size='large' type='submit'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New here? <a href='#'>Create an account</a>
      </Message>
    </Grid.Column>
  </Grid>
  )
}

