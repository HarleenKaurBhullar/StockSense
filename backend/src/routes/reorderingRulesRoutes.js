// src/routes/reorderingRuleRoutes.js
const express = require('express');
const router = express.Router();

const reorderingRuleController = require('../controllers/reorderingRuleController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, reorderingRuleController.list);
router.get('/:id', authenticateToken, reorderingRuleController.getOne);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  reorderingRuleController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  reorderingRuleController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  reorderingRuleController.remove
);

module.exports = router;