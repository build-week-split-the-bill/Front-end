import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Placeholder, Popup } from 'semantic-ui-react';

const Alert = props => {
  const [data, setData] = React.useState(null);
  const timer = React.useRef();

  return (
    <Popup
      on='click'
      onClose={() => {
        setData(null);
        clearTimeout(timer.current);
      }}
      onOpen={() => {
        setData(null);

        timer.current = setTimeout(() => {
          setData(
            {
              description: 'Please log in here!',
              name: `Account created! Welcome ${props.user.firstname}!`,
            },
            2000,
          );
        });
      }}
      popperDependencies={[!!data]}
      trigger={
        <Button color='teal' fluid size='large' onClick={props.handleSubmit}>
          Create
        </Button>
      }
      wide>
      {data === null ? (
        <Placeholder style={{ minWidth: '200px' }}>
          <Placeholder.Header>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
      ) : (
        <React.Fragment>
          <Header as='h2' content={data.name} />
          <Link to='/login'>{data.description}</Link>
        </React.Fragment>
      )}
    </Popup>
  );
};

export default Alert;
