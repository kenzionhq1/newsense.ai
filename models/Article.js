const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  topic: String,
  tone: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);

