const router = require('express').Router();
const { generateArticle } = require('../controllers/articleController');
const Article = require('../models/Article');
const checkUsageLimit = require('../middleware/limit');
// Already exists:
router.post('/save', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { topic, tone, content } = req.body;
  const article = await Article.create({ userId: req.user._id, topic, tone, content });
  res.json({ article });
});

// ✅ Add this now:
router.post('/generate', generateArticle);
router.post('/generate', checkUsageLimit, generateArticle);
// ❗ New:
router.get('/user', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const articles = await Article.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ articles });
});

module.exports = router;

const checkUsageLimit = require('../middleware/limit');


