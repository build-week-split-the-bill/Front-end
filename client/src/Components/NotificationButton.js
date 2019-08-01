import React, { useState } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

import NotificationForm from './NotificationForm';

const NotificationButton = ({ count, sum }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <Modal
      trigger={
        <Button icon onClick={handleOpen}>
          <Icon name='mail' />
        </Button>
      }
      open={modalOpen}
      onClose={handleClose}
      closeIcon>
      <Modal.Header>Send Notifications</Modal.Header>
      {/* NOTIFICATIONS */}
      <NotificationForm count={count} sum={sum} handleClose={handleClose} />
    </Modal>
  );
};

export default NotificationButton;
