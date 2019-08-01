import React, { useState } from 'react';
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert.js';

const Register = props => {
  const [user, setUsers] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const changeHandler = event => {
    const updatedUser = { ...user, [event.target.name]: event.target.value };

    setUsers(updatedUser);
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post(
        'https://split-the-bill-postgres.herokuapp.com/api/users/register',
        user,
      )
      .then()
      .catch(error => {
        console.log('O no there is an error!', error);
      });
  };
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Register your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              type='text'
              name='firstname'
              icon='user'
              iconPosition='left'
              placeholder='First Name'
              value={user.firstname}
              onChange={changeHandler}
            />
            <Form.Input
              fluid
              type='text'
              name='lastname'
              icon='thumbs up outline'
              iconPosition='left'
              placeholder='Last Name'
              value={user.lastname}
              onChange={changeHandler}
            />
            <Form.Input
              fluid
              type='email'
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='E-mail address'
              value={user.email}
              onChange={changeHandler}
            />
            <Form.Input
              fluid
              name='password'
              type='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              value={user.password}
              onChange={changeHandler}
            />
            <Alert handleSubmit={handleSubmit} user={user} />
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to='/login'> Log in Here!</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
