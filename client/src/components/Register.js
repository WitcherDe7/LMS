import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {register} from './Api'



function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    // Send registration request to server with user data (except password)
    const response = await register(name, email, password);
    console.log(response);
    navigate('/login')
  };

  return (
    <form onSubmit={handleRegistration}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
