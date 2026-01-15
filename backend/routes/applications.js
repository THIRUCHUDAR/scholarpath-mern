const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const jwt = require('jsonwebtoken'); 

// --- IMPORTANT: This MUST match the secret in routes/user.js ---
const JWT_SECRET = "secret123"; 

// 1. SUBMIT APPLICATION (For Students)
router.post('/', async (req, res) => {
  try {
    const { 
      scholarshipId, applicantName, applicantEmail, 
      phone, dateOfBirth, school, reason 
    } = req.body;

    // Check Header for Token
    const authHeader = req.headers.authorization;
    let userId = null;
    
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          userId = decoded.id || decoded.userId || decoded._id;
        } catch (e) {
          console.log("Token verification failed, saving as anonymous.");
        }
      }
    }

    const newApplication = new Application({
      scholarshipId,
      userId, // Save the User ID
      applicantName,
      applicantEmail,
      phone,
      dateOfBirth,
      school,
      reason,
      status: 'Pending'
    });

    await newApplication.save();
    return res.status(201).json({ message: 'Application submitted successfully!' });

  } catch (err) {
    console.error("Error submitting application:", err.message);
    return res.status(500).json({ message: 'Server error, please try again.' });
  }
});

// 2. GET USER APPLICATIONS (For Student Dashboard)
router.get('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    // Verify User
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id || decoded.userId || decoded._id;

    const applications = await Application.find({ userId: userId })
      .populate('scholarshipId', 'name amount eligibility')
      .sort({ applicationDate: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 3. GET ALL APPLICATIONS (For Admin Panel) --- NEW!
router.get('/', async (req, res) => {
  try {
    // Populate scholarship name so admin knows what they applied for
    const applications = await Application.find()
      .populate('scholarshipId', 'name')
      .sort({ applicationDate: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. UPDATE STATUS (For Admin Approve/Reject) --- NEW!
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true } // Return the updated document
    );
    res.json(updatedApp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;