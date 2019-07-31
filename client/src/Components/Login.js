import React from 'react'
import { useInput } from "./useInput.js";
import axios from 'axios'
import { UseLocalStorage } from "./UseLocalStorage.js";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'



export default function Login(){
  const [password, setPassword, handlePassword] = useInput("", "password");
const [email, setEmail, handleEmail] = useInput("", "email");

function handleSubmit(event) {
    event.preventDefault();
    axios
    .post('https://split-the-bill-buildweek.herokuapp.com/api/users/login', {password: password, email: email})

  .then(res=> {
    console.log(res.data)
    localStorage.setItem('token', res.data.access_token);
    console.log(res.access_token)

  })
  .catch(error=>{
    console.error(error)
  })
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

