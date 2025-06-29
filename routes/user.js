// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ✅ Correct usage

// Example: get the current user
router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false });
  res.json({ success: true, user: req.user });
});

// Add other routes using the imported User model here...

module.exports = router;
