// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaGraduationCap, FaSearchDollar, FaListAlt, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- Professional Stock Images for Layout ---
// Hero Section Image (General academic)
const heroImage = 'https://images.unsplash.com/photo-1541339907198-e0875661f97a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

// CTA Section Image (Collaborating students)
const ctaImage = 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';


// --- UPDATED: Slider Data with YOUR Specific Images ---
const sliderData = [
  {
    id: 1,
    name: "Merit-Based Scholarship",
    eligibility: "Students with 85%+ in HSC/12th Grade",
    image: "https://milestonecollegeprep.com/wp-content/uploads/2021/01/merit-blog.jpg"
  },
  {
    id: 2,
    name: "Need-Based Financial Aid",
    eligibility: "Annual family income below ₹2.5 Lakhs",
    // Updated with the new image you sent
    image: "https://scholarshipinstitute.org/wp-content/uploads/2024/12/need-based-scholarships-8d96ce3e-b867-4912-ab76-d863e7f165e5-1-1024x576.jpeg"
  },
  {
    id: 3,
    name: "Women in STEM Grant",
    eligibility: "Female students pursuing Engineering/Science",
    image: "https://edufund.in/wp-content/uploads/2022/12/scholarship-for-girl-students.jpg"
  },
  {
    id: 4,
    name: "Global Study Abroad",
    eligibility: "Students with admission letters from foreign universities",
    image: "https://assets.studies-overseas.com/Fully_Funded_Scholarships_to_Study_Abroad_a8a7db16b7.jpg"
  }
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderData.length - 1 : currentSlide - 1);
  };

  return (
    <div className="home-page">
      
      {/* --- 1. Hero Section (With Animated Gradient & Slider) --- */}
      <section className="hero-section animated-gradient-bg">
        <div className="hero-content container">
          
          {/* Left Text Content */}
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">ScholarPath</span>
            </h1>
            <p className="hero-subtitle">
              Discover thousands of scholarships to fund your education. We 
              streamline the search so you can focus on your applications.
            </p>
            <div className="hero-cta">
              <Link to="/search" className="btn btn-primary hero-btn-primary">
                Find Scholarships
              </Link>
              <Link to="/about" className="btn btn-secondary hero-btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Right Slider Content */}
          <div className="hero-slider-wrapper">
            <div className="slider-card-container">
                <button className="slider-btn prev-btn" onClick={prevSlide}><FaChevronLeft /></button>
                
                <div className="slide-card">
                  {/* Dynamic Image Background */}
                  <div className="slide-image" style={{ backgroundImage: `url(${sliderData[currentSlide].image})` }}></div>
                  
                  <div className="slide-info">
                    <span className="slide-tag">Featured</span>
                    <h3>{sliderData[currentSlide].name}</h3>
                    <p className="slide-eligibility">
                      <strong>Eligibility:</strong> {sliderData[currentSlide].eligibility}
                    </p>
                    <Link to="/search" className="btn btn-primary slide-cta">View Details</Link>
                  </div>
                </div>

                <button className="slider-btn next-btn" onClick={nextSlide}><FaChevronRight /></button>
            </div>
            
            {/* Slider Dots */}
            <div className="slider-dots">
                {sliderData.map((_, index) => (
                <span 
                    key={index} 
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                ></span>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. Features Section --- */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaSearchDollar /></div>
              <h3 className="feature-title">Personalized Search</h3>
              <p className="feature-description">
                Our smart algorithm matches you with scholarships you're actually eligible for.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaGraduationCap /></div>
              <h3 className="feature-title">Vast Database</h3>
              <p className="feature-description">
                Access millions of dollars in funding from thousands of verified opportunities.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaListAlt /></div>
              <h3 className="feature-title">Simple Application</h3>
              <p className="feature-description">
                Apply to multiple scholarships with a streamlined, easy-to-use profile.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaCheckCircle /></div>
              <h3 className="feature-title">Verified & Updated</h3>
              <p className="feature-description">
                All listings are verified by our team and updated daily. No more dead links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. How It Works Section --- */}
      <section className="how-it-works-section container">
        <h2 className="section-title">Get Started in 3 Easy Steps</h2>
        <div className="how-it-works-grid">
          <div className="how-step">
            <div className="how-step-number">1</div>
            <h3 className="how-step-title">Create Your Profile</h3>
            <p className="how-step-description">
              Sign up for free and tell us about your academics, interests, and background.
            </p>
          </div>
          <div className="how-step">
            <div className="how-step-number">2</div>
            <h3 className="how-step-title">Get Matched</h3>
            <p className="how-step-description">
              Browse your personalized list of scholarships that fit your unique profile.
            </p>
          </div>
          <div className="how-step">
            <div className="how-step-number">3</div>
            <h3 className="how-step-title">Apply & Win</h3>
            <p className="how-step-description">
              Apply directly to the scholarships you're interested in and secure funding.
            </p>
          </div>
        </div>
      </section>

      {/* --- 4. CTA Section --- */}
      <section className="cta-section">
        <div className="container cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Register now and<br />start winning!</h2>
            <p className="cta-description">
              Your free account is just a few clicks away. Start your scholarship
              journey with ScholarPath today.
            </p>
            <Link to="/signup" className="btn btn-primary hero-btn-primary">
              Create Free Account
            </Link>
          </div>
          <div className="cta-image-wrapper">
            <img src={ctaImage} alt="Students collaborating" className="cta-image" />
          </div>
        </div>
      </section>

      {/* --- 5. Final CTA --- */}
      <section className="final-cta-section container">
        <h2>Ready to find your dream scholarship?</h2>
        <p>Join thousands of students who have funded their education with ScholarPath.</p>
        <Link to="/search" className="btn btn-primary">
          Explore Scholarships Now
        </Link>
      </section>

    </div>
  );
}

export default Home;