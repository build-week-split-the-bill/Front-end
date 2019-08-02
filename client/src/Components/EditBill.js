import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { loadProgressBar } from 'axios-progress-bar';

import axios from 'axios';

const EditBill = ({ bill, handleClose, setToggle }) => {
  const [billData, setBillData] = useState({
    total: bill.split_sum * bill.split_people_count,
    count: bill.split_people_count,
  });
  const [editData, setEditData] = useState(null);

  const handleChange = event => {
    const updatedBill = {
      ...billData,
      [event.target.name]: event.target.value,
    };
    setBillData(updatedBill);
  };

  useEffect(() => {
    const updateBill = async data => {
      loadProgressBar();
      return await axios.put(
        `https://split-the-bill-postgres.herokuapp.com/api/bills/${bill.id}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
    };

    if (editData) {
      updateBill(editData)
        .then(res => {
          handleClose();
          setToggle(6);
        })
        .catch(err => console.log(err));
    }
  }, [editData, bill.id]);

  const handleSubmit = event => {
    event.preventDefault();

    const parseData = data => {
      return {
        user_id: JSON.parse(localStorage.getItem('user')).id,
        split_sum: data.total / data.count,
        split_people_count: parseInt(data.count),
      };
    };

    setEditData(parseData(billData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>
          Bill total:
          <input
            name='total'
            type='number'
            step='0.01'
            value={billData.total}
            placeholder='Enter the total bill'
            onChange={handleChange}
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label>
          Number of People to Split Between:{' '}
          <input
            name='count'
            type='number'
            step='1'
            value={billData.count}
            placeholder='Enter the number of people'
            onChange={handleChange}
          />
        </label>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default EditBill;
