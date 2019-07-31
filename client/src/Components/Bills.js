import React, { useState, useEffect } from "react";
import {
  Container,
  Segment,
  Header,
  Card,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import axios from "axios";

import Bill from "./Bill";
import AddBill from "./AddBill";

// Route /bills
const Bills = () => {
  const [bills, setBills] = useState([]);
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    console.log("open");
    setModalOpen(true);
  };
  const handleClose = () => {
    console.log("close");
    setModalOpen(false);
  };

  /* 
  useEffect(() => {
    if(!localStorage.getItem("token") && !localStorage.getItem("user")) {

      <Redirect to="/login" />
    } else {
      // axios request for all bills
    }
   }, []); 
   */

  useEffect(() => {
    // Fake user login
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo4LCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE1NjQ2MDEwNzEsImV4cCI6MTU2NDYwNDY3MX0.84bMmXEqqNdoqv8zokz4nh0S62hXncEz3wIuDvrrO_k"
    );
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 8,
        email: "test@example.com",
        firstname: "bob",
        lastname: "marley"
      })
    );

    setUser(JSON.parse(localStorage.getItem("user")));

    const getBills = async () => {
      return await axios.get(
        // Replace later
        // `https://split-the-bill-buildweek.herokuapp.com/api/users/${user.id}/bills`,
        "https://split-the-bill-buildweek.herokuapp.com/api/users/8/bills",
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
    };

    getBills()
      .then(res => {
        const listOfBills = res.data;
        setBills(listOfBills);
      })
      .catch(err => {
        console.log("Error: ", err);
        console.log("Sorry, no bills yet!");
      });
  }, [bills, user.id]);

  return (
    <Container text>
      <Header
        style={{ textTransform: "capitalize", color: "white" }}
        textAlign="center"
        as="h2"
      >
        Welcome, {user.firstname}!
      </Header>
      <Segment id="bill-container">
        {bills.length > 0 ? (
          <Card.Group centered itemsPerRow={1}>
            {bills.map(bill => {
              return <Bill key={bill.id} bill={bill} />;
            })}
          </Card.Group>
        ) : (
          <div>No bills yet</div>
        )}
        {/* Link to /addbill or show component */}
        <Modal
          trigger={
            <Button id="add" icon onClick={handleOpen}>
              <Icon name="add circle" />
            </Button>
          }
          open={modalOpen}
          onClose={handleClose}
          closeIcon
        >
          <Modal.Header>Add a Bill</Modal.Header>
          <AddBill handleClose={handleClose} />
        </Modal>
      </Segment>
    </Container>
  );
};

export default Bills;
