// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaCheckCircle, FaUniversalAccess } from 'react-icons/fa';
import './About.css'; // <-- We are creating this new CSS file

function About() {
  return (
    <div className="about-page-container">
      
      {/* --- 1. Header Section --- */}
      <section className="about-header">
        <div className="container">
          <h1>About ScholarPath</h1>
          <p className="about-subtitle">
            Our mission is to make education accessible for everyone by
            simplifying the scholarship search.
          </p>
        </div>
      </section>

      {/* --- 2. Our Story Section --- */}
      <section className="about-content container">
        <div className="about-content-inner">
          <h2>Our Story</h2>
          <p>
            Finding scholarships is a difficult and overwhelming process.
            Students and families spend countless hours searching through
            outdated websites, complex application forms, and listings
            that aren't a good fit. We've been there, and we knew there
            had to be a better way.
          </p>
          <p>
            ScholarPath was founded to solve this problem. We are a
            team of educators, developers, and former students who are
            passionate about connecting students with the funding they
            deserve. We believe that financial barriers should never
            stand in the way of a student's potential.
          </p>
        </div>
      </section>

      {/* --- 3. Our Values Section --- */}
      <section className="about-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-card-icon">
                <FaUniversalAccess />
              </div>
              <h3>Accessibility</h3>
              <p>
                Our platform is 100% free for students. We believe
                everyone deserves equal access to these opportunities.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card-icon">
                <FaCheckCircle />
              </div>
              <h3>Trust</h3>
              <p>
                We verify every scholarship listing. No more dead links
                or outdated information. Just real, verified opportunities.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card-icon">
                <FaGraduationCap />
              </div>
              <h3>Empowerment</h3>
              <p>
                We're not just a list. We provide the tools and
                resources you need to successfully apply and win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. Call to Action (CTA) Section --- */}
      <section className="about-cta">
        <div className="container">
          <h2>Start Your Journey Today</h2>
          <p>
            Your free account is just a few clicks away. Stop searching,
            start winning.
          </p>
          <Link to="/search" className="btn btn-primary hero-btn-primary">
            Find Scholarships Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;