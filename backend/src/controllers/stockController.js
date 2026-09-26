// src/controllers/stockController.js
const db = require('../config/db');

exports.getInventory = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.sku, 
        p.name AS product_name, 
        c.name AS category_name, 
        w.name AS warehouse_name, 
        l.name AS location_name, 
        s.quantity AS on_hand
      FROM stock s
      JOIN product p ON p.id = s.product_id
      LEFT JOIN category c ON c.id = p.category_id
      JOIN location l ON l.id = s.location_id
      JOIN warehouse w ON w.id = l.warehouse_id
      ORDER BY p.name;
    `;
    
    const result = await db.query(query);
    
    const inventory = result.rows;
    
    // Calculate Summary Stats
    const totalProducts = new Set(inventory.map(item => item.sku)).size;
    const inStockCount = inventory.filter(item => item.on_hand > 10).length;
    const lowStockCount = inventory.filter(item => item.on_hand > 0 && item.on_hand <= 10).length; 
    const outOfStockCount = inventory.filter(item => item.on_hand <= 0).length;
    
    res.json({ 
      inventory,
      summary: {
        totalProducts,
        inStock: inStockCount,
        lowStock: lowStockCount,
        outOfStock: outOfStockCount
      }
    });
  } catch (error) {
    console.error('Inventory list error:', error);
    res.status(500).json({ error: 'Could not fetch inventory levels' });
  }
};