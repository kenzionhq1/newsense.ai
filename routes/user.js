const router = require('express').Router();

router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not logged in' });
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    tier: req.user.tier
  });
});

module.exports = router;
