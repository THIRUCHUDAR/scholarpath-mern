const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: String, 
    required: true 
  },
  eligibility: { 
    type: String, 
    required: true 
  },
  // --- ADDED THESE FIELDS ---
  deadline: { 
    type: String, 
    required: false // Optional
  },
  image: {
    type: String, // Stores the URL of the image
    required: false
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('Scholarship', scholarshipSchema);