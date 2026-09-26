// src/controllers/partnerController.js
const db = require('../config/db');

const VALID_PARTNER_TYPES = ['supplier', 'customer'];

exports.list = async (req, res) => {
  try {
    const { type } = req.query; // optional ?type=supplier filter
    let query = `SELECT id, name, type FROM partner`;
    const params = [];

    if (type) {
      query += ` WHERE type = $1`;
      params.push(type);
    }
    query += ` ORDER BY name`;

    const result = await db.query(query, params);
    res.json({ partners: result.rows });
  } catch (error) {
    console.error('Partner list error:', error);
    res.status(500).json({ error: 'Could not fetch partners' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, type FROM partner WHERE id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    res.json({ partner: result.rows[0] });
  } catch (error) {
    console.error('Partner getOne error:', error);
    res.status(500).json({ error: 'Could not fetch partner' });
  }
};

exports.create = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: 'Name and type are required' });
  }
  if (!VALID_PARTNER_TYPES.includes(type)) {
    return res.status(400).json({ error: `type must be one of: ${VALID_PARTNER_TYPES.join(', ')}` });
  }

  try {
    const result = await db.query(
      `INSERT INTO partner (name, type)
       VALUES ($1, $2)
       RETURNING id, name, type`,
      [name, type]
    );
    res.status(201).json({ partner: result.rows[0] });
  } catch (error) {
    console.error('Partner create error:', error);
    res.status(500).json({ error: 'Could not create partner' });
  }
};

exports.update = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: 'Name and type are required' });
  }
  if (!VALID_PARTNER_TYPES.includes(type)) {
    return res.status(400).json({ error: `type must be one of: ${VALID_PARTNER_TYPES.join(', ')}` });
  }

  try {
    const result = await db.query(
      `UPDATE partner
       SET name = $1, type = $2
       WHERE id = $3
       RETURNING id, name, type`,
      [name, type, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    res.json({ partner: result.rows[0] });
  } catch (error) {
    console.error('Partner update error:', error);
    res.status(500).json({ error: 'Could not update partner' });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM partner WHERE id = $1 RETURNING id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    res.json({ message: 'Partner deleted' });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({ error: 'Partner is in use by existing documents' });
    }
    console.error('Partner delete error:', error);
    res.status(500).json({ error: 'Could not delete partner' });
  }
};