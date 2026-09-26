// src/routes/locationRoutes.js
const express = require('express');
const router = express.Router();

const locationController = require('../controllers/locationController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, locationController.list);
router.get('/:id', authenticateToken, locationController.getOne);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  locationController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  locationController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  locationController.remove
);

module.exports = router;