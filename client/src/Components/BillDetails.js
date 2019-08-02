import React from 'react';
import { Modal, Header } from 'semantic-ui-react';

const BillDetails = ({ bill, total }) => {
  return (
    <Modal.Content>
      <Modal.Description>
        <Header>{bill.createdAt}</Header>
        <p>Total amount of the bill: ${total}</p>
        <p>Total # of people split: {bill.split_people_count}</p>
      </Modal.Description>
    </Modal.Content>
  );
};

export default BillDetails;
