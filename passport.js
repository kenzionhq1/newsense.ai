const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://newsense-ai.onrender.com/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  try {
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value || null,
      tier: 'free',
    };
    return done(null, user);
  } catch (err) {
    console.error('Google Strategy Error:', err);
    return done(err, null);
  }
}));


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
