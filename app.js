const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('cookie-session');
const cors = require('cors');
require('dotenv').config();

require('./passport'); // passport config file

const app = express(); // ✅ This was missing

app.use(cors({
  origin: ['http://localhost:3000', 'https://newsense-puce.vercel.app'],
  credentials: true,
}));

app.use(express.json()); // ✅ You might also need this

const session = require('express-session');

app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true on production (https)
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/articles', require('./routes/articles'));

app.listen(5000, () => console.log('Server on http://localhost:5000'));
