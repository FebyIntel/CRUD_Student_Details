// backend/routes/index.js
const express = require('express');
const router = express.Router();

// Importing routes
const studentsRouter = require('./students');

// Routes
router.use('/students', studentsRouter);

module.exports = router;
