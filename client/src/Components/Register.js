import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import useLocalState from "./hooks.js";
import axios from "axios";
import Alert from "./Alert.js";

const Register = () => {
    
    const [user, setUsers] = useState({ firstname: "", lastname: "", email: "", password: ""});
    const [success, setSuccess] = useState(null)
    

    console.log('user', user)

    const changeHandler = (event) => {
        console.log('user2', user)
        const updatedUser = { ...user, [event.target.name]: event.target.value };
        console.log('changeHandler:', event.target.name, event.target.value, updatedUser)
        setUsers(updatedUser);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(user);

        axios.post("https://split-the-bill-buildweek.herokuapp.com/api/users/register", (user))
            .then(response => {
                setSuccess(response.data)
                
                console.log('response', response)
            })
            .catch(error => {
                console.log('O no there is an error!', error);
            })
    }
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
                                type="text"
                                name="firstname"
                                icon='user' 
                                iconPosition='left' 
                                placeholder='First Name'
                                value={user.firstname} 
                                onChange={changeHandler}
                            />
                            <Form.Input
                                fluid
                                type="text"
                                name="lastname"
                                icon='thumbs up outline'
                                iconPosition='left'
                                placeholder='Last Name'
                                value={user.lastname}
                                onChange={changeHandler}
                                
                            />
                            <Form.Input 
                                fluid 
                                type="email"
                                name="email"
                                icon='mail' 
                                iconPosition='left' 
                                placeholder='E-mail address'
                                value={user.email} 
                                onChange={changeHandler}
                            />
                            <Form.Input 
                                fluid 
                                name="password"
                                type="password"
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
                Already have an account? <a href='#'> Log in Here!</a>
                </Message>
              </Grid.Column>
            </Grid>
        )       
};

export default Register