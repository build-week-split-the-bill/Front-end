import React, { useState, useEffect } from 'react';
import {
  Container,
  Segment,
  Header,
  Card,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Bill from './Bill';
import AddBill from './AddBill';

// Route /bills
const Bills = ({ ...props }) => {
  const [bills, setBills] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [modalOpen, setModalOpen] = useState(false);
  const [toggle, setToggle] = useState(null);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    let isSubscribed = true;
    const getBills = async () => {
      return await axios.get(
        `https://split-the-bill-postgres.herokuapp.com/api/users/${
          user.id
        }/bills`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
    };

    getBills()
      .then(res => {
        const listOfBills = res.data;
        if (isSubscribed) {
          setBills(listOfBills);
          setToggle(0);
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      });

    return () => (isSubscribed = false);
  }, [toggle]);

  if (
    localStorage.getItem('token') === null ||
    localStorage.getItem('user') === null
  ) {
    return <Redirect to='/login' />;
  }

  return (
    <Container text>
      <Header
        style={{ textTransform: 'capitalize', color: 'white' }}
        textAlign='center'
        as='h2'>
        Welcome, {user.firstname}!
      </Header>
      <Segment id='bill-container'>
        {bills.length > 0 ? (
          <Card.Group centered itemsPerRow={1}>
            {bills.map(bill => {
              return (
                <Bill
                  key={bill.id}
                  bill={bill}
                  setToggle={setToggle}
                  bills={bills}
                  props={props}
                />
              );
            })}
          </Card.Group>
        ) : (
          <div>No bills yet</div>
        )}
        {/* Link to /addbill or show component */}
        <Modal
          trigger={
            <Button id='add' icon onClick={handleOpen}>
              <Icon name='add circle' />
            </Button>
          }
          open={modalOpen}
          onClose={handleClose}
          closeIcon>
          <Modal.Header>Add a Bill</Modal.Header>
          <AddBill setToggle={setToggle} handleClose={handleClose} />
        </Modal>
      </Segment>
    </Container>
  );
};

export default Bills;
