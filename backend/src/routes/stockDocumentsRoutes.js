const express = require('express');
const router = express.Router();
const stockDocController = require('../controllers/stockDocumentController');

// Expose the list function we created earlier
router.get('/', stockDocController.list); 

// Your existing routes
router.post('/', stockDocController.create);
router.put('/:id/status', stockDocController.updateStatus);

module.exports = router;