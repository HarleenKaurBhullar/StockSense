// src/controllers/categoryController.js
const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, description FROM category ORDER BY name`
    );
    res.json({ categories: result.rows });
  } catch (error) {
    console.error('Category list error:', error);
    res.status(500).json({ error: 'Could not fetch categories' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, description FROM category WHERE id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ category: result.rows[0] });
  } catch (error) {
    console.error('Category getOne error:', error);
    res.status(500).json({ error: 'Could not fetch category' });
  }
};

exports.create = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO category (name, description)
       VALUES ($1, $2)
       RETURNING id, name, description`,
      [name, description || null]
    );
    res.status(201).json({ category: result.rows[0] });
  } catch (error) {
    console.error('Category create error:', error);
    res.status(500).json({ error: 'Could not create category' });
  }
};

exports.update = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await db.query(
      `UPDATE category
       SET name = $1, description = $2
       WHERE id = $3
       RETURNING id, name, description`,
      [name, description || null, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ category: result.rows[0] });
  } catch (error) {
    console.error('Category update error:', error);
    res.status(500).json({ error: 'Could not update category' });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM category WHERE id = $1 RETURNING id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (error) {
    // FK violation: category still referenced by a product
    if (error.code === '23503') {
      return res.status(409).json({ error: 'Category is in use by existing products' });
    }
    console.error('Category delete error:', error);
    res.status(500).json({ error: 'Could not delete category' });
  }
};