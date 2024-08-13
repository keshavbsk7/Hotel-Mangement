// SignupPage.js

import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/admins/signup', {
        username,
        password
      });

      if (response.data.success) {
        console.log('Admin created successfully');
        // Redirect to the homepage or show a success message
      } else {
        console.error(response.data.message);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error(error);
      // Handle network error, server error, etc.
    }
  };

  return (
    <div>
      <h1>Admin Signup</h1>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
