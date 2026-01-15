// src/components/ApplyForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaSchool, FaPenFancy, FaPaperPlane, FaUpload } from 'react-icons/fa'; // Added FaUpload
import './ApplyForm.css'; // Styling for your form fields

// --- CONFIGURATION ---
// REPLACE THIS with your actual Google Form link specifically for Certificate Uploads
const CERTIFICATE_UPLOAD_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfCgzEOUWYZuO83RktEjomhvI0Odm41L0UnXYyf5anjQNoH0A/viewform?usp=dialog"; 
// ---------------------

function ApplyForm() {
    const { scholarshipId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        applicantName: '',
        applicantEmail: '',
        phone: '',
        dateOfBirth: '',
        school: '',
        reason: ''
    });

    // 🏆 NEW STATE: Tracks if the user has completed the external upload step
    const [uploadConfirmed, setUploadConfirmed] = useState(false);
    
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handler for opening and confirming the external upload form
    const handleExternalUpload = () => {
        // Open the Google Form for certificate upload in a new tab
        window.open(CERTIFICATE_UPLOAD_FORM_URL, '_blank');
        
        // After opening the link, we assume the user will complete the step
        // This enables the final submission button.
        setUploadConfirmed(true);
        setMessage('Upload form opened. Click Submit Application when done!');
        setIsError(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 🏆 STEP 1: CHECK UPLOAD CONFIRMATION
        if (!uploadConfirmed) {
            setMessage('Please upload and confirm your supporting certificates first.');
            setIsError(true);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // 1. Get the User's Token
            const token = localStorage.getItem('token');
            
            // 2. Create the Header Configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };

            // Include the scholarship ID in the application data
            const applicationData = { ...formData, scholarshipId, documentsUploaded: true }; 
            
            // 3. Send POST request to your backend endpoint (you must create this route)
            // NOTE: Ensure your backend's application route handles the POST request
            await axios.post(
                'http://localhost:3000/api/applications', 
                applicationData,
                config 
            );

            setMessage('Application submitted successfully!');
            setIsError(false);
            
            setTimeout(() => navigate('/dashboard'), 2000); 

        } catch (err) {
            console.error("Application submission error:", err);
            setMessage(err.response?.data?.message || 'Application failed. Please try again.');
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="apply-page-container">
            <div className="apply-card">
                <div className="apply-header">
                    <h2>Scholarship Application</h2>
                    <p>Please fill out your details below to apply for this opportunity.</p>
                </div>

                {message && (
                    <div className={`status-message ${isError ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="apply-form">
                    
                    <div className="form-grid">
                        {/* Input fields */}
                        <div className="input-group"><label>Full Name</label><div className="input-wrapper"><FaUser className="input-icon" /><input type="text" name="applicantName" placeholder="John Doe" value={formData.applicantName} onChange={handleChange} required /></div></div>
                        <div className="input-group"><label>Email Address</label><div className="input-wrapper"><FaEnvelope className="input-icon" /><input type="email" name="applicantEmail" placeholder="john@example.com" value={formData.applicantEmail} onChange={handleChange} required /></div></div>
                        <div className="input-group"><label>Phone Number</label><div className="input-wrapper"><FaPhone className="input-icon" /><input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required /></div></div>
                        <div className="input-group"><label>Date of Birth</label><div className="input-wrapper"><FaCalendarAlt className="input-icon" /><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required /></div></div>
                    </div>

                    <div className="input-group full-width">
                        <label>Current School / College</label>
                        <div className="input-wrapper">
                            <FaSchool className="input-icon" />
                            <input type="text" name="school" placeholder="University Name..." value={formData.school} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* 🏆 STEP 2: CERTIFICATE UPLOAD BUTTON */}
                    <div className="input-group full-width upload-step-group">
                        <label> Upload Supporting Certificates (Mandatory)</label>
                        <button 
                            type="button"
                            onClick={handleExternalUpload} 
                            className={`btn btn-upload-external ${uploadConfirmed ? 'btn-success' : 'btn-secondary'}`}
                            style={{ width: '100%' }}
                        >
                            <FaUpload /> 
                            {uploadConfirmed ? 'Confirmed & Uploaded (Click to View/Re-upload)' : 'Go to External Upload Form'}
                        </button>
                        {uploadConfirmed && 
                            <p className="upload-confirmed-text status-success">
                                ✅ Certificates form opened. You may submit below.
                            </p>
                        }
                    </div>


                    <div className="input-group full-width">
                        <label>Why do you deserve this scholarship?</label>
                        <div className="input-wrapper textarea-wrapper">
                            <FaPenFancy className="input-icon textarea-icon" />
                            <textarea name="reason" rows="5" placeholder="Tell us about your achievements and goals..." value={formData.reason} onChange={handleChange} required></textarea>
                        </div>
                    </div>

                    {/* Final Submission Button (Disabled until confirmed) */}
                    <button 
                        type="submit" 
                        className={`btn btn-primary submit-btn ${!uploadConfirmed || isSubmitting ? 'btn-disabled' : ''}`}
                        disabled={!uploadConfirmed || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : <><FaPaperPlane /> Submit Application</>}
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default ApplyForm;