// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", formData);

      // Check if login was successful
      if (res.data.message === 'Login successful 🎉' || res.data.token) {
        
        // 1. Save Token
        const token = res.data.token || 'dummy-token';
        localStorage.setItem('token', token);
        
        // 2. DETERMINE THE USER NAME (The Fix)
        let finalName = "";

        // A. Check if the server sent the name
        if (res.data.user && res.data.user.name) {
          finalName = res.data.user.name;
        } else if (res.data.name) {
          finalName = res.data.name;
        } 
        // B. If server didn't send it, check if we saved it during Signup
        else {
          const tempName = localStorage.getItem('tempUserName');
          if (tempName) {
            finalName = tempName;
          } else {
            // C. Last Resort: Use the email part (only if we have absolutely nothing else)
            finalName = formData.email.split('@')[0];
          }
        }

        // 3. Save the final name to be used in Navbar
        localStorage.setItem('userName', finalName);
        
        // 4. Redirect
        window.location.href = '/';

      } else {
        setMessage(res.data.message || "Login failed.");
        setIsError(true);
        setIsLoading(false);
      }

    } catch (err) {
      setMessage(err.response?.data?.error || "An unexpected error occurred.");
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-wrapper">
        
        <div className="auth-form-side">
          <h2>Login</h2>
          <p className="form-greeting">Please enter your credentials.</p>

          {message && 
            <div className={`auth-message ${isError ? 'auth-message-error' : 'auth-message-success'}`}>
              <p>{message}</p>
            </div>
          }

          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-link">
            Don't have an account? <Link to="/signup">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;