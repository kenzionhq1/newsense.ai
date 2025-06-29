const express = require('express');
const passport = require('passport');
const router = express.Router();

// 1. Login with Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// 2. Google callback
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'https://newsense-puce.vercel.app/dashboard',

    failureRedirect: '/login/failed'
  })
);

// 3. Current user session
router.get('/current-user', (req, res) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.json({ success: false });
  }
});

// 4. Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_HOME_URL || 'http://localhost:3000');
  });
});

module.exports = router;
