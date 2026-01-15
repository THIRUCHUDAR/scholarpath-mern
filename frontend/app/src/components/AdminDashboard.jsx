// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaPlus, FaUserGraduate } from 'react-icons/fa';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  
  // Form State (Added 'image' field)
  const [newScholarship, setNewScholarship] = useState({
    name: '', amount: '', eligibility: '', deadline: '', image: ''
  });

  // Fetch all data
  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/applications');
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle Status Update
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/applications/${id}/status`, { status });
      fetchApplications();
    } catch (err) {
      alert("Error updating status");
    }
  };

  // Handle Add Scholarship
  const handleAddScholarship = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/scholarships', newScholarship);
      alert("Scholarship Added Successfully!");
      // Reset form
      setNewScholarship({ name: '', amount: '', eligibility: '', deadline: '', image: '' });
    } catch (err) {
      alert("Failed to add scholarship");
    }
  };

  const handleInputChange = (e) => {
    setNewScholarship({ ...newScholarship, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Control Panel</h1>
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
            <FaUserGraduate /> Applications
          </button>
          <button className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            <FaPlus /> Add Scholarship
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* --- TAB 1: APPLICATIONS --- */}
        {activeTab === 'applications' && (
          <div className="applications-view">
            <h2>Student Applications</h2>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Scholarship</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td>{app.applicantName}<br/><small>{app.applicantEmail}</small></td>
                      <td>{app.scholarshipId ? app.scholarshipId.name : 'Unknown'}</td>
                      <td><span className={`status-badge ${app.status ? app.status.toLowerCase() : 'pending'}`}>{app.status || 'Pending'}</span></td>
                      <td className="action-cell">
                        <button className="action-btn approve" onClick={() => updateStatus(app._id, 'Approved')}><FaCheck /></button>
                        <button className="action-btn reject" onClick={() => updateStatus(app._id, 'Rejected')}><FaTimes /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 2: ADD SCHOLARSHIP (Updated) --- */}
        {activeTab === 'add' && (
          <div className="add-view">
            <h2>Create New Scholarship</h2>
            <form onSubmit={handleAddScholarship} className="admin-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={newScholarship.name} onChange={handleInputChange} placeholder="Scholarship Name" required />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input type="text" name="amount" value={newScholarship.amount} onChange={handleInputChange} placeholder="Amount (e.g. ₹50,000)" required />
              </div>
              <div className="form-group">
                <label>Eligibility</label>
                <input type="text" name="eligibility" value={newScholarship.eligibility} onChange={handleInputChange} placeholder="Eligibility Criteria" required />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="text" name="deadline" value={newScholarship.deadline} onChange={handleInputChange} placeholder="Deadline (e.g. Dec 2025)" />
              </div>
              {/* --- NEW IMAGE INPUT --- */}
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image" value={newScholarship.image} onChange={handleInputChange} placeholder="Paste image link here..." />
              </div>
              <button type="submit" className="btn btn-primary">Publish</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;