// controllers/productController.js
const db = require('../config/db');

exports.list = async (req, res) => {
  const result = await db.query(
    `SELECT p.*, c.name AS category_name
     FROM product p LEFT JOIN category c ON c.id = p.category_id
     ORDER BY p.name`
  );
  res.json({ products: result.rows });
};

exports.create = async (req, res) => {
  const { name, sku, category_id, unit_of_measure, unit_cost } = req.body;
  if (!name || !sku || !unit_of_measure) {
    return res.status(400).json({ error: 'name, sku, unit_of_measure are required' });
  }
  try {
    const result = await db.query(
      `INSERT INTO product (name, sku, category_id, unit_of_measure, unit_cost)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, sku, category_id || null, unit_of_measure, unit_cost || 0]
    );
    res.status(201).json({ product: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'SKU already exists' });
    console.error(err);
    res.status(500).json({ error: 'Could not create product' });
  }
};

exports.update = async (req, res) => { /* similar, UPDATE ... WHERE id = $n */ };
exports.remove = async (req, res) => { /* DELETE ... WHERE id = $1 */ };