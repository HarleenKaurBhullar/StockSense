const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendOTPEmail } = require('../utils/email');
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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }

    // Find user
    const result = await db.query(
      `SELECT id, email
       FROM users
       WHERE email = $1`,
      [email]
    );

    /*
      Important:
      Don't reveal whether an email exists.
      This prevents account enumeration.
    */
    if (result.rows.length === 0) {
      return res.json({
        message: 'If the email is registered, an OTP has been sent.',
      });
    }

    const user = result.rows[0];

    // Generate 6-digit OTP
    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    // Hash OTP before storing it
    const otpHash = await bcrypt.hash(otp, 10);

    // OTP valid for 10 minutes
    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Invalidate previous OTPs
    await db.query(
      `UPDATE password_reset_otps
       SET verified = TRUE
       WHERE user_id = $1
       AND verified = FALSE`,
      [user.id]
    );

    // Store new OTP
    await db.query(
      `INSERT INTO password_reset_otps
        (user_id, otp_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [
        user.id,
        otpHash,
        expiresAt,
      ]
    );

    // Send OTP
    await sendOTPEmail(user.email, otp);

    res.json({
      message: 'If the email is registered, an OTP has been sent.',
    });

  } catch (error) {
    console.error('Forgot password error:', error);

    res.status(500).json({
      error: 'Could not process password reset request',
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        error: 'Email and OTP are required',
      });
    }

    const userResult = await db.query(
      `SELECT id
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        error: 'Invalid or expired OTP',
      });
    }

    const userId = userResult.rows[0].id;

    // Get latest unverified OTP
    const otpResult = await db.query(
      `SELECT id, otp_hash, expires_at, attempts
       FROM password_reset_otps
       WHERE user_id = $1
       AND verified = FALSE
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (otpResult.rows.length === 0) {
      return res.status(400).json({
        error: 'Invalid or expired OTP',
      });
    }

    const resetOTP = otpResult.rows[0];

    // Check expiry
    if (new Date() > new Date(resetOTP.expires_at)) {
      return res.status(400).json({
        error: 'OTP has expired',
      });
    }

    // Limit attempts
    if (resetOTP.attempts >= 5) {
      return res.status(429).json({
        error: 'Too many OTP attempts',
      });
    }

    // Compare OTP
    const validOTP = await bcrypt.compare(
      otp,
      resetOTP.otp_hash
    );

    if (!validOTP) {
      await db.query(
        `UPDATE password_reset_otps
         SET attempts = attempts + 1
         WHERE id = $1`,
        [resetOTP.id]
      );

      return res.status(400).json({
        error: 'Invalid or expired OTP',
      });
    }

    // Mark OTP as verified
    await db.query(
      `UPDATE password_reset_otps
       SET verified = TRUE
       WHERE id = $1`,
      [resetOTP.id]
    );

    /*
      Create a temporary password-reset token.

      This is NOT the normal login JWT.
    */
    const resetToken = jwt.sign(
      {
        userId,
        purpose: 'password_reset',
        otpId: resetOTP.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10m',
      }
    );

    res.json({
      message: 'OTP verified successfully',
      resetToken,
    });

  } catch (error) {
    console.error('OTP verification error:', error);

    res.status(500).json({
      error: 'OTP verification failed',
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        error: 'Email and OTP are required',
      });
    }

    const userResult = await db.query(
      `SELECT id
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        error: 'Invalid or expired OTP',
      });
    }

    const userId = userResult.rows[0].id;

    // Get latest unverified OTP
    const otpResult = await db.query(
      `SELECT id, otp_hash, expires_at, attempts
       FROM password_reset_otps
       WHERE user_id = $1
       AND verified = FALSE
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (otpResult.rows.length === 0) {
      return res.status(400).json({
        error: 'Invalid or expired OTP',
      });
    }

    const resetOTP = otpResult.rows[0];

    // Check expiry
    if (new Date() > new Date(resetOTP.expires_at)) {
      return res.status(400).json({
        error: 'OTP has expired',
      });
    }

    // Limit attempts
    if (resetOTP.attempts >= 5) {
      return res.status(429).json({
        error: 'Too many OTP attempts',
      });
    }

    // Compare OTP
    const validOTP = await bcrypt.compare(
      otp,
      resetOTP.otp_hash
    );

    if (!validOTP) {
      await db.query(
        `UPDATE password_reset_otps
         SET attempts = attempts + 1
         WHERE id = $1`,
        [resetOTP.id]
      );

      return res.status(400).json({
        error: 'Invalid or expired OTP',
      });
    }

    // Mark OTP as verified
    await db.query(
      `UPDATE password_reset_otps
       SET verified = TRUE
       WHERE id = $1`,
      [resetOTP.id]
    );

    /*
      Create a temporary password-reset token.

      This is NOT the normal login JWT.
    */
    const resetToken = jwt.sign(
      {
        userId,
        purpose: 'password_reset',
        otpId: resetOTP.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10m',
      }
    );

    res.json({
      message: 'OTP verified successfully',
      resetToken,
    });

  } catch (error) {
    console.error('OTP verification error:', error);

    res.status(500).json({
      error: 'OTP verification failed',
    });
  }
};