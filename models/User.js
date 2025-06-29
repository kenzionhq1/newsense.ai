// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: String,
  tier: { type: String, enum: ['free', 'pro'], default: 'free' },
  createdAt: { type: Date, default: Date.now },
  articleCount: { type: Number, default: 0 },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
