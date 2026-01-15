const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // <-- IMPORT THIS
const User = require('../models/user'); // Ensure filename casing matches (User.js vs user.js)
const router = express.Router();

// --- IMPORTANT: This secret MUST match the one in applications.js ---
const JWT_SECRET = "secret123"; 

// 🔹 Signup route
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// 🔹 Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3. GENERATE TOKEN (The Missing Part)
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload (User Data)
      JWT_SECRET,                          // Secret Key
      { expiresIn: '2h' }                  // Expiry time
    );

    // 4. Send Token AND User Data back
    res.json({ 
      message: "Login successful 🎉", 
      token: token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;