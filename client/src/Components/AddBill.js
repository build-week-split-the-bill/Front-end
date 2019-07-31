import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

// TODO: Working but need to work on closing after submit -> open notification modal/component?
const AddBill = ({ handleClose }) => {
  const [billData, setBillData] = useState({ total: "", count: "" });
  const [postData, setPostData] = useState(null);

  const handleChange = event => {
    const updatedBill = {
      ...billData,
      [event.target.name]: event.target.value
    };
    setBillData(updatedBill);
  };

  useEffect(() => {
    const submitData = async data => {
      return await axios.post(
        "https://split-the-bill-buildweek.herokuapp.com/api/bills/",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
    };

    if (postData) {
      submitData(postData)
        .then(res => {
          handleClose();
          console.log("Successfully added bill!");
        })
        .catch(err => console.log(err));
    }
  }, [postData]);

  const handleSubmit = event => {
    event.preventDefault();

    const parseData = data => {
      return {
        user_id: JSON.parse(localStorage.getItem("user")).id,
        split_sum: (data.total / data.count).toFixed(2),
        split_people_count: parseInt(data.count)
      };
    };

    setPostData(parseData(billData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>
          Bill total:{" "}
          <input
            name="total"
            type="number"
            step="0.01"
            value={billData.total}
            placeholder="Enter the total bill"
            onChange={handleChange}
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label>
          Number of People to Split Between:{" "}
          <input
            name="count"
            type="number"
            step="1"
            value={billData.count}
            placeholder="Enter the number of people"
            onChange={handleChange}
          />
        </label>
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default AddBill;
