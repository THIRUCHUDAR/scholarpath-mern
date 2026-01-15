const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  scholarshipId: {
    type: Schema.Types.ObjectId,
    ref: 'Scholarship',
    required: true
  },
  // --- NEW: Link to the User (Crucial for Dashboard) ---
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for now so old apps don't break
  },
  // ----------------------------------------------------
  applicantName: {
    type: String,
    required: true
  },
  applicantEmail: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  school: {
    type: String,
    required: true,
    trim: true
  },
  reason: {
    type: String,
    required: true
  },
  // --- NEW: Application Status ---
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  // -------------------------------
  applicationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);