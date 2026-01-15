const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship.js');

// 1. GET ALL SCHOLARSHIPS (For Search Page)
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    console.error("Error fetching scholarships:", err.message);
    res.status(500).send('Server Error');
  }
});

// 2. ADD NEW SCHOLARSHIP (For Admin Panel) --- NEW!
router.post('/', async (req, res) => {
  const { name, amount, eligibility, deadline, image } = req.body;

  const newScholarship = new Scholarship({
    name,
    amount,
    eligibility,
    deadline,
    // image: image // Uncomment if you added image to your Schema
  });

  try {
    const savedScholarship = await newScholarship.save();
    res.status(201).json(savedScholarship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;