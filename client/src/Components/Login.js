import React from 'react';
import { useInput } from './useInput.js';
import axios from 'axios';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const [password, setPassword, handlePassword] = useInput('');
  const [email, setEmail, handleEmail] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('https://split-the-bill-postgres.herokuapp.com/api/users/login', {
        password: password,
        email: email,
      })

      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return props[0].history.push('/bills');
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              type='email'
              value={email}
              onChange={handleEmail}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={handlePassword}
            />

            <Button color='purple' fluid size='large' type='submit'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New here? <Link to='/register'>Create an account</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
