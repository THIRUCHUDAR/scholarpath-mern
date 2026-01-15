// src/components/Contact.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Page.css';
import { FaEnvelope } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_k0peads",
      "template_zpgqcu4",
      formData,
      "TTVAMkBUJMyNewEya"
    )
    .then(
      (response) => {
        setStatusMessage("Message sent successfully!");
        setIsError(false);
        setFormData({ user_name: '', user_email: '', message: '' });
      },
      (error) => {
        setStatusMessage("Failed to send message. Please try again.");
        setIsError(true);
      }
    );
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <div className="content-box-icon"><FaEnvelope /></div>
        <h2>Contact Us</h2>
        <p className="content-box-subtitle">
          Have questions? Reach out to us below.
        </p>

        {statusMessage && (
          <div className={`auth-message ${isError ? 'auth-message-error' : 'auth-message-success'}`}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="user_name"
              id="name"
              className="form-input"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="user_email"
              id="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              className="form-input"
              rows="5"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;