// src/routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, warehouseController.list);
router.get('/:id', authenticateToken, warehouseController.getOne);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  warehouseController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  warehouseController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  warehouseController.remove
);

module.exports = router;