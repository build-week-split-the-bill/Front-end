import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const NotificationForm = ({ count, sum, handleClose }) => {
  const email = { email: '' };
  const [emails, setEmails] = useState([{ ...email }]);
  const [counter, setCounter] = useState(1);
  const templateId = 'template_HkMFd9VB';
  const senderEmail = JSON.parse(localStorage.getItem('user')).email;
  const feedback = `You owe $${sum} for your part of the bill!`;

  const addEmail = number => {
    if (counter < number) {
      setEmails([...emails, { ...email }]);
      setCounter(counter => counter + 1);
    }
  };

  const handleChange = event => {
    const updatedEmails = [...emails];
    updatedEmails[event.target.dataset.index][event.target.className] =
      event.target.value;
    setEmails(updatedEmails);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const emailStrings = emails.map(friend => {
      return friend.email;
    });

    emailStrings.forEach(receiverEmail => {
      sendFeedback(templateId, senderEmail, receiverEmail, feedback);
    });
  };

  const sendFeedback = (templateId, senderEmail, receiverEmail, feedback) => {
    window.emailjs
      .send('mailgun', templateId, {
        senderEmail,
        receiverEmail,
        feedback,
      })
      .then(res => {
        handleClose();
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Failed to send feedback. Error: ', err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type='button'
        value='Add an email'
        onClick={() => addEmail(count)}
      />
      {emails.map((val, index) => {
        const emailId = `email-${index}`;

        return (
          <div key={`email-${index}`}>
            <label htmlFor={emailId}>{`Email #${index + 1}`}</label>
            <input
              type='email'
              name={emailId}
              data-index={index}
              id={emailId}
              value={emails[index].email}
              onChange={handleChange}
              className='email'
            />
          </div>
        );
      })}
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default NotificationForm;
