const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  tier: String,
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema); // ✅ safe check
