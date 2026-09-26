// src/controllers/locationController.js
const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
        l.id, l.name, l.short_code, l.warehouse_id, l.parent_location_id,
        w.name AS warehouse_name
       FROM location l
       LEFT JOIN warehouse w ON w.id = l.warehouse_id
       ORDER BY w.name, l.name`
    );
    res.json({ locations: result.rows });
  } catch (error) {
    console.error('Location list error:', error);
    res.status(500).json({ error: 'Could not fetch locations' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, short_code, warehouse_id, parent_location_id
       FROM location WHERE id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ location: result.rows[0] });
  } catch (error) {
    console.error('Location getOne error:', error);
    res.status(500).json({ error: 'Could not fetch location' });
  }
};

exports.create = async (req, res) => {
  const { name, short_code, warehouse_id, parent_location_id } = req.body;

  if (!name || !warehouse_id) {
    return res.status(400).json({ error: 'Name and warehouse_id are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO location (name, short_code, warehouse_id, parent_location_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, short_code, warehouse_id, parent_location_id`,
      [name, short_code || null, warehouse_id, parent_location_id || null]
    );
    res.status(201).json({ location: result.rows[0] });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(400).json({ error: 'warehouse_id or parent_location_id does not exist' });
    }
    console.error('Location create error:', error);
    res.status(500).json({ error: 'Could not create location' });
  }
};

exports.update = async (req, res) => {
  const { name, short_code, warehouse_id, parent_location_id } = req.body;

  if (!name || !warehouse_id) {
    return res.status(400).json({ error: 'Name and warehouse_id are required' });
  }

  try {
    const result = await db.query(
      `UPDATE location
       SET name = $1, short_code = $2, warehouse_id = $3, parent_location_id = $4
       WHERE id = $5
       RETURNING id, name, short_code, warehouse_id, parent_location_id`,
      [name, short_code || null, warehouse_id, parent_location_id || null, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ location: result.rows[0] });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(400).json({ error: 'warehouse_id or parent_location_id does not exist' });
    }
    console.error('Location update error:', error);
    res.status(500).json({ error: 'Could not update location' });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM location WHERE id = $1 RETURNING id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ message: 'Location deleted' });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({ error: 'Location is in use by stock, documents, or child locations' });
    }
    console.error('Location delete error:', error);
    res.status(500).json({ error: 'Could not delete location' });
  }
};