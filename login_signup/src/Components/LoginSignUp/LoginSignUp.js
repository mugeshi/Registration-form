import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './LoginSignUp.css';

const LoginSignUp = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
      </div>
      <div className="inputs">
        <div className="input-group">
          <label htmlFor="username">
            <FontAwesomeIcon icon={faUser} /> Username:
          </label>
          <input type="text" id="username" />
        </div>
        <div className="input-group">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email:
          </label>
          <input type="email" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Password:
          </label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Sign Up</button>
        <button type="submit">Login</button>
        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
      </div>
    </div>
  );
};

export default LoginSignUp;
