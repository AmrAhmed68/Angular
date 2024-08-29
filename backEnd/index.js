const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
const aRoutes = require('./routes/auth.routes')
app.use('/api/auth', aRoutes);
require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));
  
  const photoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    description: String,
  });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
