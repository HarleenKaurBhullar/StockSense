// src/controllers/warehouseController.js
const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, short_code, address FROM warehouse ORDER BY name`
    );
    res.json({ warehouses: result.rows });
  } catch (error) {
    console.error('Warehouse list error:', error);
    res.status(500).json({ error: 'Could not fetch warehouses' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, short_code, address FROM warehouse WHERE id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    res.json({ warehouse: result.rows[0] });
  } catch (error) {
    console.error('Warehouse getOne error:', error);
    res.status(500).json({ error: 'Could not fetch warehouse' });
  }
};

exports.create = async (req, res) => {
  const { name, short_code, address } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO warehouse (name, short_code, address)
       VALUES ($1, $2, $3)
       RETURNING id, name, short_code, address`,
      [name, short_code || null, address || null]
    );
    res.status(201).json({ warehouse: result.rows[0] });
  } catch (error) {
    console.error('Warehouse create error:', error);
    res.status(500).json({ error: 'Could not create warehouse' });
  }
};

exports.update = async (req, res) => {
  const { name, short_code, address } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await db.query(
      `UPDATE warehouse
       SET name = $1, short_code = $2, address = $3
       WHERE id = $4
       RETURNING id, name, short_code, address`,
      [name, short_code || null, address || null, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    res.json({ warehouse: result.rows[0] });
  } catch (error) {
    console.error('Warehouse update error:', error);
    res.status(500).json({ error: 'Could not update warehouse' });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM warehouse WHERE id = $1 RETURNING id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    res.json({ message: 'Warehouse deleted' });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({ error: 'Warehouse is in use by existing locations or documents' });
    }
    console.error('Warehouse delete error:', error);
    res.status(500).json({ error: 'Could not delete warehouse' });
  }
};