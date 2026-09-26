// src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, categoryController.list);
router.get('/:id', authenticateToken, categoryController.getOne);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  categoryController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  categoryController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  categoryController.remove
);

module.exports = router;