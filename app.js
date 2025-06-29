const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session'); // ✅ Correct package
const cors = require('cors');
require('dotenv').config();

require('./passport'); // ✅ Must come after passport config

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://newsense-puce.vercel.app'],
  credentials: true,
}));

app.use(express.json()); // ✅ Required for parsing JSON

app.use(session({
  secret: process.env.COOKIE_KEY, // ✅ Example: 'my-secret-key'
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true only on HTTPS
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
