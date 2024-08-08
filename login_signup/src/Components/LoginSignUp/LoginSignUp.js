import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './LoginSignUp.css';
import axios from 'axios';

const LoginSignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(false); // Track if it's a login or sign-up

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
    try {
      const response = await axios.post(url, { username, email, password });
      console.log(response.data);
      // Handle successful authentication (e.g., redirect, show a success message)
    } catch (error) {
      console.error('Error during authentication', error);
      // Handle authentication error
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{isLogin ? 'Login' : 'Sign Up'}</div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">
            <FontAwesomeIcon icon={faUser} /> Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>
        <div className="input-group">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="input-group">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
      </form>
    </div>
  );
};

export default LoginSignUp;
