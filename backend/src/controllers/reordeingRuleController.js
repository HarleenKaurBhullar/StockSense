// src/controllers/reorderingRuleController.js
const db = require('../config/db');

function validateQuantities(minimum_quantity, maximum_quantity) {
  if (minimum_quantity == null || maximum_quantity == null) {
    return 'minimum_quantity and maximum_quantity are required';
  }
  if (minimum_quantity < 0) {
    return 'minimum_quantity cannot be negative';
  }
  if (maximum_quantity < minimum_quantity) {
    return 'maximum_quantity cannot be less than minimum_quantity';
  }
  return null;
}

exports.list = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
        r.id, r.product_id, r.warehouse_id, r.location_id,
        r.minimum_quantity, r.maximum_quantity, r.created_at, r.updated_at,
        p.name AS product_name, p.sku,
        w.name AS warehouse_name,
        l.name AS location_name
       FROM reordering_rule r
       JOIN product p ON p.id = r.product_id
       JOIN warehouse w ON w.id = r.warehouse_id
       JOIN location l ON l.id = r.location_id
       ORDER BY p.name`
    );
    res.json({ reorderingRules: result.rows });
  } catch (error) {
    console.error('Reordering rule list error:', error);
    res.status(500).json({ error: 'Could not fetch reordering rules' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity, created_at, updated_at
       FROM reordering_rule WHERE id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reordering rule not found' });
    }
    res.json({ reorderingRule: result.rows[0] });
  } catch (error) {
    console.error('Reordering rule getOne error:', error);
    res.status(500).json({ error: 'Could not fetch reordering rule' });
  }
};

exports.create = async (req, res) => {
  const { product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity } = req.body;

  if (!product_id || !warehouse_id || !location_id) {
    return res.status(400).json({ error: 'product_id, warehouse_id and location_id are required' });
  }

  const validationError = validateQuantities(minimum_quantity, maximum_quantity);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const result = await db.query(
      `INSERT INTO reordering_rule
        (product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity, created_at, updated_at`,
      [product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity]
    );
    res.status(201).json({ reorderingRule: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'A reordering rule already exists for this product and location' });
    }
    if (error.code === '23503') {
      return res.status(400).json({ error: 'product_id, warehouse_id or location_id does not exist' });
    }
    console.error('Reordering rule create error:', error);
    res.status(500).json({ error: 'Could not create reordering rule' });
  }
};

exports.update = async (req, res) => {
  const { minimum_quantity, maximum_quantity } = req.body;

  const validationError = validateQuantities(minimum_quantity, maximum_quantity);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const result = await db.query(
      `UPDATE reordering_rule
       SET minimum_quantity = $1, maximum_quantity = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING id, product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity, created_at, updated_at`,
      [minimum_quantity, maximum_quantity, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reordering rule not found' });
    }
    res.json({ reorderingRule: result.rows[0] });
  } catch (error) {
    console.error('Reordering rule update error:', error);
    res.status(500).json({ error: 'Could not update reordering rule' });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM reordering_rule WHERE id = $1 RETURNING id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reordering rule not found' });
    }
    res.json({ message: 'Reordering rule deleted' });
  } catch (error) {
    console.error('Reordering rule delete error:', error);
    res.status(500).json({ error: 'Could not delete reordering rule' });
  }
};