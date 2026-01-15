// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
    try {
      // 1. Send data to backend
      await axios.post("http://localhost:3000/api/user", formData);

      // --- CRITICAL FIX: Save the name locally ---
      // Since the backend doesn't send the name back during login,
      // we save it here temporarily so the Login page can grab it.
      localStorage.setItem('tempUserName', formData.name); 
      // -------------------------------------------

      setMessage("Account Created Successfully! Redirecting to login...");
      setIsError(false);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-wrapper">

        <div className="auth-form-side">
          <h2>Create an Account</h2>
          <p className="form-greeting">Join us to find your scholarship path.</p>

          {message &&
            <div className={`auth-message ${isError ? 'auth-message-error' : 'auth-message-success'}`}>
              {message}
            </div>
          }

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Create Account</button>
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;