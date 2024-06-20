const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        // console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
      }
    });
  } else {
    console.error('Token missing');
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
