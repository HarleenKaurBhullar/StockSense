// routes/productRoutes.js
const router = require('express').Router();
const c = require('../controllers/productController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, c.list);
router.post('/', authenticateToken, authorizeRoles('inventory_manager'), c.create);
router.put('/:id', authenticateToken, authorizeRoles('inventory_manager'), c.update);
router.delete('/:id', authenticateToken, authorizeRoles('inventory_manager'), c.remove);

module.exports = router;