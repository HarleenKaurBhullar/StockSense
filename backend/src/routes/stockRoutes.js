// src/routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Add middleware here if you have authentication

router.get('/', stockController.getInventory);

module.exports = router;