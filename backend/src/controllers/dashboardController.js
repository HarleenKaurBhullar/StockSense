// src/controllers/dashboardController.js

const db = require('../config/db');

exports.summary = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        type,

        COUNT(*) FILTER (
          WHERE status NOT IN ('done', 'canceled')
        )::int AS total,

        COUNT(*) FILTER (
          WHERE status = 'waiting'
        )::int AS waiting,

        COUNT(*) FILTER (
          WHERE scheduled_date < NOW()
          AND status NOT IN ('done', 'canceled')
        )::int AS late

      FROM stock_document

      WHERE type IN ('receipt', 'delivery')

      GROUP BY type
    `);

    const summary = {
      receipts: {
        total: 0,
        waiting: 0,
        late: 0
      },
      deliveries: {
        total: 0,
        waiting: 0,
        late: 0
      }
    };

    result.rows.forEach(row => {
      if (row.type === 'receipt') {
        summary.receipts = {
          total: row.total,
          waiting: row.waiting,
          late: row.late
        };
      }

      if (row.type === 'delivery') {
        summary.deliveries = {
          total: row.total,
          waiting: row.waiting,
          late: row.late
        };
      }
    });

    res.json(summary);

  } catch (error) {
    console.error('Dashboard summary error:', error);

    res.status(500).json({
      error: 'Could not fetch dashboard summary'
    });
  }
};