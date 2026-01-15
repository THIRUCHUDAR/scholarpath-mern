require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app' // change later
  ],
  credentials: true
}));

app.use(express.json());

// --- TEST ROOT ROUTE (VERY IMPORTANT FOR VERCEL) ---
app.get("/", (req, res) => {
  res.send("ScholarPath API is running 🚀");
});

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

// --- EXPORT APP FOR VERCEL ---
module.exports = app;
