const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Access Denied!');

  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = validToken;
  } catch (error) {
    res.status(400).send('Invalid Token!');
  }
};

module.exports = verifyToken;
