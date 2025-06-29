const express = require('express');
const router = express.Router();

const { generateArticle } = require('../controllers/articleController');
const Article = require('../models/Article');
const checkUsageLimit = require('../middleware/limit');

// 🔐 Save article to DB
router.post('/save', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { topic, tone, content } = req.body;

  try {
    const article = await Article.create({
      userId: req.user._id,
      topic,
      tone,
      content,
    });

    res.json({ article });
  } catch (err) {
    console.error('❌ Save Error:', err);
    res.status(500).json({ message: 'Failed to save article' });
  }
});

// ✅ Generate article with AI + usage limit check
router.post('/generate', checkUsageLimit, generateArticle);

// 📄 Get current user's articles
router.get('/user', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const articles = await Article.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (err) {
    console.error('❌ Fetch Error:', err);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

module.exports = router;
