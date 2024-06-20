const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // To handle CORS
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database connected');
  app.listen(4000, () => {
    console.log(`Server is running`);
  });
})
.catch((err) => console.error('Database connection error:', err));
