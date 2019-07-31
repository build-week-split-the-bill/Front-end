import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";

// token and setToken come from the App component
// It will be a boolean value
const NavBar = ({ token, setToken }) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  // Causes a re-render after token updates
  useEffect(() => {}, [token]);

  const successfullyLoggedIn = () => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      return true;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setActiveItem("login");
    setToken(false);
    // redirect
  };

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        {/* Change to="/" to point to marketing page? */}
        <Menu.Item
          name="home"
          as={Link}
          to="/"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
        {/* Change to="/about" to point to marketing page about? */}
        <Menu.Item
          name="about"
          as={Link}
          to="/about"
          active={activeItem === "about"}
          onClick={handleItemClick}
        />
        {/* Changes based on whether or not a user is logged in (maybe use token?) */}
        {successfullyLoggedIn() ? (
          <Menu.Menu position="right">
            {/* TODO: Add Menu Items for bills/user? Maybe add a drop-down for options */}
            <Menu.Item
              name="bills"
              as={Link}
              to="/bills"
              active={activeItem === "bills"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="logout"
              as={Link}
              to="/login"
              active={activeItem === "logout"}
              onClick={event => {
                handleItemClick(event, event.target.name);
                logout();
              }}
            />
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              as={Link}
              to="/login"
              active={activeItem === "login"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="sign-up"
              as={Link}
              to="/signup"
              active={activeItem === "sign-up"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        )}
      </Menu>
    </Segment>
  );
};

export default NavBar;
