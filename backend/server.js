require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://scholarpath-mern.vercel.app' // ✅ your frontend domain (change if different)
  ],
  credentials: true
}));

app.use(express.json());

/* -------------------- ROOT TEST ROUTE -------------------- */
app.get("/", (req, res) => {
  res.status(200).send("ScholarPath API is running 🚀");
});

/* -------------------- DATABASE -------------------- */
const MONGO_URI = process.env.MONGODB_URL;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URL is missing");
} else {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err.message));
}

/* -------------------- ROUTES -------------------- */
app.use('/api/user', require('./routes/user'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api/applications', require('./routes/applications'));

/* -------------------- EXPORT FOR VERCEL -------------------- */
module.exports = app;
