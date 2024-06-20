const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = [
  { email: 'root', password: 'root' }
];

// Mock authentication route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
