// src/routes/partnerRoutes.js
const express = require('express');
const router = express.Router();

const partnerController = require('../controllers/partnerController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, partnerController.list);
router.get('/:id', authenticateToken, partnerController.getOne);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  partnerController.create
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  partnerController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('inventory_manager'),
  partnerController.remove
);

module.exports = router;