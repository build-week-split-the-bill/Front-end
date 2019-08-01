import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

const NavBar = ({ token, setToken }) => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  // Causes a re-render after token updates
  useEffect(() => {
    setInterval(() => {
      setToken(token);
    }, 500);
  }, [token]);

  const successfullyLoggedIn = () => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      return true;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setActiveItem('login');
    setToken(false);
  };

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        {/* Change to="/" to point to marketing page? */}
        <Menu.Item
          name='home'
          as='a'
          href='https://sleepy-liskov-ea2384.netlify.com/index.html'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        {/* Change to="/about" to point to marketing page about? */}
        <Menu.Item
          name='about'
          as='a'
          href='https://sleepy-liskov-ea2384.netlify.com/contactpage.html'
          active={activeItem === 'about'}
          onClick={handleItemClick}
        />
        {successfullyLoggedIn() ? (
          <Menu.Menu position='right'>
            <Menu.Item
              name='bills'
              as={Link}
              to='/bills'
              active={activeItem === 'bills'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='logout'
              as={Link}
              to='/login'
              active={activeItem === 'logout'}
              onClick={event => {
                handleItemClick(event, event.target.name);
                logout();
              }}
            />
          </Menu.Menu>
        ) : (
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              as={Link}
              to='/login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='register'
              as={Link}
              to='/register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        )}
      </Menu>
    </Segment>
  );
};

export default NavBar;
