// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  // State to track if we are in dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Theme Logic: Initialization and Persistence ---
  useEffect(() => {
    // 1. Check saved theme (persistence)
    const savedTheme = localStorage.getItem('theme');
    // 2. Check system preference fallback
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial state: savedTheme > systemPref > default light
    const initialTheme = savedTheme 
      ? savedTheme 
      : (prefersDark ? 'dark' : 'light');

    // FIX: Use classList to match the 'html.dark' selector in index.css
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark'); 
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
    
    // Save the determined initial theme if it wasn't already set
    if (!savedTheme) {
        localStorage.setItem('theme', initialTheme);
    }
  }, []); // Run only once on mount

  // 4. Toggle Dark Mode Function
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    
    // FIX: Use classList to toggle the theme
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode); // Toggle local state
  };
  // ----------------------------------------

  // 1. Function to check login status & find name 
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
        setIsLoggedIn(true);
        const savedName = localStorage.getItem('userName');
        if (savedName && savedName !== 'undefined') {
          setUserName(savedName);
        } else {
          setUserName('User'); 
        }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  // 2. Check status on mount & listen for storage changes
  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);
  
  // 5. Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail'); 
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    localStorage.removeItem('tempUserName');
    
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          🎓 ScholarPath
        </Link>

        <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-links-left">
            <NavLink to="/" end className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink to="/search" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Search
                </NavLink>
                <NavLink to="/dashboard" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </NavLink>
              </>
            )}
            <NavLink to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </NavLink>
          </div>

          <div className="nav-buttons-right">
            {/* --- Dark Mode Toggle Button --- */}
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            {/* ------------------------------- */}
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="nav-user-info" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaUserCircle className="nav-user-icon" />
                  <span className="nav-user-name">{userName}</span>
                </Link>
                <button onClick={handleLogout} className="nav-btn btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-btn btn-login" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/signup" className="nav-btn btn-signup" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;