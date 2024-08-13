import React, { useState } from 'react';
import axios from 'axios';
import "../styles/LoginsStyles.css";
const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/v1/admins/login', { username, password });
      if (response.data.success) {
        // Redirect to the homepage if login is successful
        window.location.href = '/';
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className='form-container'>
      
      <form layout='vertical' className='Login-form'>
        <h1>Admin login</h1>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
