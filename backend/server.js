require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: [
    'http://localhost:5173',          // local frontend (development)
    'https://your-frontend.vercel.app' // deployed frontend (production)
  ],
  credentials: true
}));

app.use(express.json());

// --- MONGODB CONNECTION ---
const MONGO_URI = process.env.MONGODB_URL;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URL is not defined in environment variables");
} else {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));
}

// --- ROUTES ---
app.use('/api/user', require('./routes/user'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api/applications', require('./routes/applications'));

// --- EXPORT APP (IMPORTANT FOR VERCEL) ---
module.exports = app;
