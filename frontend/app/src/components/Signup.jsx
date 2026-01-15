// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import './Auth.css';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      await axios.post(
        `${API_BASE_URL}/api/user`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      // Save name temporarily (optional fallback)
      localStorage.setItem('tempUserName', formData.name);

      setMessage("Account created successfully! Redirecting...");
      setIsError(false);

      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
      setIsError(true);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-wrapper">
        <div className="auth-form-side">
          <h2>Create an Account</h2>

          {message && (
            <div className={`auth-message ${isError ? 'auth-message-error' : 'auth-message-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Create Account</button>
          </form>

          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
