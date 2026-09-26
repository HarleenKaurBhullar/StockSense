const jwt = require('jsonwebtoken');

const VALID_ROLES = [
  'inventory_manager',
  'warehouse_staff',
];


// AUTHENTICATION
// Checks whether the user is logged in.
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Authentication required',
    });
  }

  // Expected:
  // Authorization: Bearer <token>

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Invalid authorization format',
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Make sure JWT contains the information our application expects
    if (!decoded.id || !decoded.role) {
      return res.status(403).json({
        error: 'Invalid authentication token',
      });
    }

    if (!VALID_ROLES.includes(decoded.role)) {
      return res.status(403).json({
        error: 'Invalid user role',
      });
    }

    // Attach logged-in user to request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(403).json({
      error: 'Invalid or expired token',
    });
  }
};


// AUTHORIZATION
// Checks whether the logged-in user's role is allowed.
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'You do not have permission to perform this action',
      });
    }

    next();
  };
};