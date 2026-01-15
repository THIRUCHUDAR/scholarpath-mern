// src/components/ScholarshipCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ScholarshipCard.css';

// Hardcoded images (Fallback)
const scholarshipImages = {
  merit: "https://milestonecollegeprep.com/wp-content/uploads/2021/01/merit-blog.jpg",
  need: "https://scholarshipinstitute.org/wp-content/uploads/2024/12/need-based-scholarships-8d96ce3e-b867-4912-ab76-d863e7f165e5-1-1024x576.jpeg",
  global: "https://assets.studies-overseas.com/Fully_Funded_Scholarships_to_Study_Abroad_a8a7db16b7.jpg",
  stem: "https://tse1.mm.bing.net/th/id/OIP.UYbsoOu86tIqVWEbZDjMzAAAAA?pid=Api&P=0&h=180",
  girl: "https://edufund.in/wp-content/uploads/2022/12/scholarship-for-girl-students.jpg"
};

function findScholarshipImage(name) {
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName.includes('merit')) return scholarshipImages.merit;
  if (lowerCaseName.includes('need')) return scholarshipImages.need;
  if (lowerCaseName.includes('global')) return scholarshipImages.global;
  if (lowerCaseName.includes('stem')) return scholarshipImages.stem;
  if (lowerCaseName.includes('girl')) return scholarshipImages.girl;
  return scholarshipImages.global;
}

function ScholarshipCard({ scholarship }) {
  
  // LOGIC: If the admin provided an image link, use it. 
  // Otherwise, try to find a matching image by name.
  const imageUrl = scholarship.image ? scholarship.image : findScholarshipImage(scholarship.name);

  return (
    <div className="scholarship-card">
      <div className="scholarship-card-image">
        <img src={imageUrl} alt={scholarship.name} onError={(e) => {e.target.src = scholarshipImages.global}} />
      </div>
      <div className="scholarship-card-content">
        <h3 className="scholarship-card-title">{scholarship.name}</h3>
        
        <div className="scholarship-card-details">
          <p><strong>Amount:</strong> {scholarship.amount}</p>
          <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
          {/* Show deadline if it exists */}
          {scholarship.deadline && <p><strong>Deadline:</strong> {scholarship.deadline}</p>}
        </div>
        
        <Link to={`/apply/${scholarship._id}`} className="btn btn-primary apply-btn">
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default ScholarshipCard;