import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import axios from 'axios';

const SearchPage = () => {
  //const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const onfinishHandler = async (values) => {
    try {
      const response = await axios.post('/api/v1/users/search', values);
      const user = response.data.data;

      if (response.data.success) {
        setSearchResult(user);
        message.success('User found successfully!');
      } else {
        setSearchResult(null);
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <Form onFinish={onfinishHandler}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name!' }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item>
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </Form.Item>
      </Form>

      {searchResult && (
        <div>
          <h2>Search Result</h2>
          <p>Name: {searchResult.name}</p>
          <p>Email: {searchResult.email}</p>
          <p>Gender: {searchResult.age}</p>
          {/* Display other user data as needed */}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
