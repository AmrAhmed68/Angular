const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    req.user = user;  // Attach the decoded token data to req.user
    next();
  });
};

const ensureAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden: Admins only' });
};

module.exports = { ensureAuthenticated, ensureAdmin };