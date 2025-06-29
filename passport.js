const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user.id); // MongoDB _id
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) return done(null, existingUser);

    const newUser = await User.create({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
    });

    return done(null, newUser);
  } catch (err) {
    return done(err, null);
  }
}));
