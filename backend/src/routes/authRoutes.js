const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const {
  authenticateToken,
  authorizeRoles,
} = require('../middleware/authMiddleware');


// =========================
// PUBLIC ROUTES
// =========================

router.post(
  '/register',
  authController.register
);

router.post(
  '/login',
  authController.login
);


// =========================
// PROTECTED ROUTES
// =========================

// Any logged-in user
router.get(
  '/profile',
  authenticateToken,
  authController.getProfile
);


// Inventory-manager-only test route
router.get(
  '/manager-test',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  (req, res) => {
    res.json({
      message: 'Inventory Manager access granted',
      user: req.user,
    });
  }
);


// Warehouse-staff-only test route
router.get(
  '/warehouse-test',
  authenticateToken,
  authorizeRoles('warehouse_staff'),
  (req, res) => {
    res.json({
      message: 'Warehouse Staff access granted',
      user: req.user,
    });
  }
);


module.exports = router;