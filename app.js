const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('cookie-session');
const cors = require('cors');
require('dotenv').config();

require('./passport'); // passport config file



app.use(cors({
  origin: ['http://localhost:3000', 'https://newsense-puce.vercel.app'], // ✅ allow dev + production
  credentials: true,
}));


app.use(session({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/articles', require('./routes/articles'));

app.listen(5000, () => console.log('Server on http://localhost:5000'));
