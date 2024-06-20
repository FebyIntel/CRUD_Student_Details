// backend/models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
});

const student = mongoose.model('student', studentSchema);

module.exports = student;
