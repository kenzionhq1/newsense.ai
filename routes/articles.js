const router = require('express').Router();
const Article = require('../models/Article');

router.post('/save', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

  const { topic, tone, content } = req.body;
  const article = await Article.create({
    userId: req.user._id,
    topic, tone, content
  });

  res.json({ message: 'Saved', article });
});

module.exports = router;
