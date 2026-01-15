// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';
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
    setIsError(false);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/user/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = res.data;

      if (!token) {
        throw new Error("Token not received");
      }

      // Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem(
        "userName",
        user?.name || formData.email.split("@")[0]
      );

      // Redirect to home
      window.location.href = "/";

    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-wrapper">
        <div className="auth-form-side">
          <h2>Login</h2>

          {message && (
            <div className={`auth-message ${isError ? 'auth-message-error' : 'auth-message-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
