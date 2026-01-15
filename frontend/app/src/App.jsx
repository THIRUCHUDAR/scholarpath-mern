import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';
import ApplyForm from './components/ApplyForm';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ScholarBot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

import './App.css';

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdminRoute && <Navbar />}

      <main className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/apply/:scholarshipId" element={<ApplyForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScholarBot />}
    </div>
  );
}

export default function App() {
  return <Layout />;
}
