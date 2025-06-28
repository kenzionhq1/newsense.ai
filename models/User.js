const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  tier: { type: String, default: 'free' },
  usageCount: { type: Number, default: 0 },
  lastReset: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
