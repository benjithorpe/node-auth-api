const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).json({ message: 'Access Denied!' });

  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = validToken;
    next(); // Call the next middleware
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token!' });
  }
};

module.exports = verifyToken;
