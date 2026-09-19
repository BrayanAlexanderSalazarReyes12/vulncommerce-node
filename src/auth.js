const jwt = require('jsonwebtoken');
const config = require('./config');

function createToken(user) {
  // LAB-JWT-101: JWT firmado con secreto débil y hardcodeado.
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    config.jwtSecret,
    { algorithm: 'HS256', expiresIn: '24h' }
  );
}

function optionalAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    req.user = null;
  }

  next();
}

module.exports = { createToken, optionalAuth };
