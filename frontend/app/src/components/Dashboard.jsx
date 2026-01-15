// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make the call
import { FaUserCircle, FaHistory, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // 1. Check Login
    const token = localStorage.getItem('token');
    const savedName = localStorage.getItem('userName');
    
    if (!token) {
      navigate('/login');
      return;
    }
    setUserName(savedName || 'Student');

    // 2. Fetch Real Applications from Backend
    const fetchApplications = async () => {
      try {
        // We send the token so the backend knows WHICH user is asking
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // or just `token` depending on your backend middleware
            // If your backend expects the token in a specific header key like 'x-auth-token', change it here.
          },
        };

        // Make the request to your backend
        // NOTE: Ensure your backend has a route GET /api/applications/user
        const res = await axios.get('http://localhost:3000/api/applications/user', config);
        
        setApplications(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applications:", err);
        // If error, we just show empty list or handle error state
        setLoading(false); 
      }
    };

    fetchApplications();

  }, [navigate]);

  // Helper for Status Badge
  const getStatusBadge = (status) => {
    // Default to 'Pending' if no status exists
    const currentStatus = status || 'Pending';
    
    switch(currentStatus) {
      case 'Approved': return <span className="status-badge success"><FaCheckCircle /> Approved</span>;
      case 'Pending': return <span className="status-badge pending"><FaHourglassHalf /> Pending</span>;
      case 'Rejected': return <span className="status-badge error"><FaTimesCircle /> Rejected</span>;
      default: return <span className="status-badge">{currentStatus}</span>;
    }
  };

  // Format Date Helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="dashboard-container"><p style={{marginTop: '50px'}}>Loading your dashboard...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <FaUserCircle className="welcome-icon" />
            <div>
              <h1>Welcome back, {userName}!</h1>
              <p>Here is an overview of your scholarship journey.</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Applied</h3>
            <p className="stat-number">{applications.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number">{applications.filter(a => !a.status || a.status === 'Pending').length}</p>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <p className="stat-number">{applications.filter(a => a.status === 'Approved').length}</p>
          </div>
        </div>

        {/* Applications List */}
        <div className="applications-section">
          <h2><FaHistory /> Application History</h2>
          
          {applications.length > 0 ? (
            <div className="table-responsive">
              <table className="app-table">
                <thead>
                  <tr>
                    <th>Scholarship Name</th>
                    <th>Date Applied</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      {/* We handle cases where scholarshipId might be populated or just an ID */}
                      <td className="app-name">
                        {app.scholarshipId && app.scholarshipId.name 
                          ? app.scholarshipId.name 
                          : "Scholarship Application"}
                      </td>
                      <td>{formatDate(app.createdAt || app.date)}</td>
                      <td>
                         {app.scholarshipId && app.scholarshipId.amount 
                          ? app.scholarshipId.amount 
                          : "N/A"}
                      </td>
                      <td>{getStatusBadge(app.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              <p>You haven't applied to any scholarships yet.</p>
              <button className="btn btn-primary" onClick={() => navigate('/search')}>Browse Scholarships</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;