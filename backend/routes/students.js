const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const authenticate = require('../middleware/authenticate');
const student = require('../models/student');

// Get all students
router.get('/', authenticate, async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch students', error: err.message });
  }
});

// Create a new student
router.post('/', authenticate, async (req, res) => {
  const { name, email, department } = req.body;

  try {
    const newStudent = new Student({ name, email, department });
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create Student', error: err.message });
  }
});

// Update a student
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, email, department } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, { name, email, department }, { new: true });
    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update student', error: err.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete student', error: err.message });
  }
});

module.exports = router;
