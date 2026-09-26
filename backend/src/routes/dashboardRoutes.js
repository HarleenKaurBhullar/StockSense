// src/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get(
  '/summary',
  authenticateToken,
  dashboardController.summary
);

module.exports = router;