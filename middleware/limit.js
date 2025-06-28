const User = require('../models/User');

module.exports = async function checkUsageLimit(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Login required' });

  const user = await User.findById(req.user._id);
  const tier = user.tier || 'free';
  const now = new Date();

  // Reset usage every 12 hours
  const diff = (now - user.lastReset) / (1000 * 60 * 60);
  if (diff >= 12) {
    user.usageCount = 0;
    user.lastReset = now;
  }

  const limits = {
    anonymous: 5,
    free: 20,
    pro: Infinity,
  };

  if (user.usageCount >= limits[tier]) {
    return res.status(403).json({ message: `Limit reached (${limits[tier]} every 12h)` });
  }

  user.usageCount += 1;
  await user.save();

  next();
};
