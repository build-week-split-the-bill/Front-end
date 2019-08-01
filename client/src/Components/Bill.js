import React, { useState } from 'react';
import { Card, Feed, Icon, Button, Modal } from 'semantic-ui-react';

import EditBill from './EditBill';
import BillDetails from './BillDetails';
//import NotificationButton from './NotificationButton';
import axios from 'axios';

const Bill = ({ bill, bills, setToggle, props }) => {
  const total = (bill.split_sum * bill.split_people_count).toFixed(2);
  const [modalOpen, setModalOpen] = useState(false);
  const count = bill.split_people_count;

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const deleteBill = () => {
    return axios
      .delete(
        `https://split-the-bill-postgres.herokuapp.com/api/bills/${bill.id}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(() => {
        if (bills.length < 2) {
          return props[0].history.push('/');
        }
        setToggle(3);
      })
      .catch(err => console.log(err));
  };

  return (
    <Card>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Feed.Date content={bill.createdAt} />
              <Feed.Summary>Total amount of the bill: ${total}</Feed.Summary>
              <Feed.Summary>
                Total # of people split: {bill.split_people_count}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
          <div id='buttons-container'>
            <div id='edit-and-notification'>
              <Modal
                trigger={
                  <Button icon onClick={handleOpen}>
                    <Icon name='edit outline' />
                  </Button>
                }
                open={modalOpen}
                onClose={handleClose}
                closeIcon>
                <Modal.Header>Edit a Bill</Modal.Header>
                {/* EDIT BILL */}
                <EditBill
                  bill={bill}
                  handleClose={handleClose}
                  setToggle={setToggle}
                />
              </Modal>
              {/* NOTIFICATIONS */}
              {/*<NotificationButton count={count} />*/}
            </div>

            <Modal trigger={<Button icon>See bill details</Button>} closeIcon>
              <Modal.Header>Bill Details</Modal.Header>
              {/* BILL DETAILS */}
              <BillDetails bill={bill} total={total} />
            </Modal>

            <Button icon onClick={deleteBill}>
              <Icon name='delete' />
            </Button>
          </div>
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default Bill;
