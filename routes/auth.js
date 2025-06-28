const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: 'http://localhost:3000/dashboard' // or production
}));

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('Logged out');
  });
});

module.exports = router;
