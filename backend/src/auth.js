const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify JWT token
function authenticateToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

// Verify password
function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

// Hash password
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// Check if user has required role
function hasRole(user, requiredRole) {
  if (!user) return false;
  return user.role === requiredRole || user.role === 'admin';
}

// Check if user is admin
function isAdmin(user) {
  return user && user.role === 'admin';
}

module.exports = {
  generateToken,
  authenticateToken,
  verifyPassword,
  hashPassword,
  hasRole,
  isAdmin,
};

