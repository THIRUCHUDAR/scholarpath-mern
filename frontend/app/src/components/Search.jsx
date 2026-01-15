// src/components/Search.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScholarshipCard from './ScholarshipCard'; // We will create this
import './Search.css'; // We will create this

function Search() {
  const [allScholarships, setAllScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // 2. Fetch all scholarships on page load
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/scholarships');
        setAllScholarships(response.data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  // 3. Filter scholarships based on the search query
  const filteredScholarships = useMemo(() => {
    return allScholarships.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.eligibility.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allScholarships, searchQuery]);

  return (
    <div className="search-page-container">
      {/* Search Header */}
      <div className="search-header">
        <h1>Browse Scholarships</h1>
        <p>Find all available opportunities below or use the search to filter.</p>
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, eligibility, etc..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Scholarship Grid */}
      <div className="scholarship-grid-container container">
        {loading ? (
          <p>Loading scholarships...</p>
        ) : (
          <div className="scholarship-grid">
            {filteredScholarships.length > 0 ? (
              filteredScholarships.map(scholarship => (
                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
              ))
            ) : (
              <p>No scholarships found matching your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;