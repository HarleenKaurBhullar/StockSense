const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const VALID_ROLES = ['inventory_manager', 'warehouse_staff'];

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Name, email and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long',
      });
    }

    // Check whether email already exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: 'Email is already registered',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    /*
      New users are warehouse staff by default.

      We do NOT accept role from the frontend because otherwise
      anyone could register themselves as inventory_manager.
    */
    const result = await db.query(
      `INSERT INTO users
        (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, 'warehouse_staff']
    );

    res.status(201).json({
      message: 'Registration successful',
      user: result.rows[0],
    });

  } catch (error) {
    console.error('Registration error:', error);

    res.status(500).json({
      error: 'User registration failed',
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    // Find user
    const result = await db.query(
      `SELECT
        id,
        name,
        email,
        password_hash,
        role
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    const user = result.rows[0];

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Make sure database role is one of our valid project roles
    if (!VALID_ROLES.includes(user.role)) {
      return res.status(403).json({
        error: 'Invalid user role',
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.json({
      message: 'Login successful',

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      error: 'Login failed',
    });
  }
};


// GET CURRENT USER
exports.getProfile = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
        id,
        name,
        email,
        role,
        created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json({
      user: result.rows[0],
    });

  } catch (error) {
    console.error('Profile error:', error);

    res.status(500).json({
      error: 'Could not fetch profile',
    });
  }
};