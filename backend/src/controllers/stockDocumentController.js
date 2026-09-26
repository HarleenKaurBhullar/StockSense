// controllers/stockDocumentController.js
const db = require('../config/db');

exports.create = async (req, res) => {
  const { type, warehouse_id, source_location_id, dest_location_id, partner_id, reference, reason, lines } = req.body;
  // lines = [{ product_id, quantity/expected_quantity/requested_quantity... }]

  const doc = await db.query(
    `INSERT INTO stock_document
      (type, status, warehouse_id, source_location_id, dest_location_id, partner_id, reference, responsible_id, reason)
     VALUES ($1,'draft',$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [type, warehouse_id, source_location_id, dest_location_id, partner_id, reference, req.user.id, reason]
  );

  for (const line of lines) {
    await db.query(
      `INSERT INTO stock_document_line (document_id, product_id, expected_quantity)
       VALUES ($1,$2,$3)`,
      [doc.rows[0].id, line.product_id, line.quantity]
    );
  }

  res.status(201).json({ document: doc.rows[0] });
};

// The critical one: transitioning status to 'done'
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'ready' | 'done' | 'canceled' etc.

  const docResult = await db.query('SELECT * FROM stock_document WHERE id=$1', [id]);
  if (docResult.rows.length === 0) return res.status(404).json({ error: 'Document not found' });
  const document = docResult.rows[0];

  if (status === 'done' && document.status !== 'done') {
    const lines = await db.query('SELECT * FROM stock_document_line WHERE document_id=$1', [id]);

    try {
      await db.query('BEGIN');

      for (const line of lines.rows) {
        const qty = line.received_quantity ?? line.picked_quantity ?? line.expected_quantity;

        if (document.type === 'receipt') {
          await applyStockDelta(document.dest_location_id, line.product_id, qty, document.id);
        } else if (document.type === 'delivery') {
          await applyStockDelta(document.source_location_id, line.product_id, -qty, document.id);
        } else if (document.type === 'transfer') {
          await applyStockDelta(document.source_location_id, line.product_id, -qty, document.id);
          await applyStockDelta(document.dest_location_id, line.product_id, qty, document.id);
        } else if (document.type === 'adjustment') {
          const delta = line.counted_quantity - line.system_quantity;
          await applyStockDelta(document.dest_location_id, line.product_id, delta, document.id);
        }
      }

      await db.query('COMMIT');
    } catch (err) {
      await db.query('ROLLBACK');
      if (err.code === '23514') return res.status(400).json({ error: 'Operation would result in negative stock' });
      throw err;
    }
  }

  const updated = await db.query(
    `UPDATE stock_document SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
    [status, id]
  );
  res.json({ document: updated.rows[0] });
};

async function applyStockDelta(location_id, product_id, delta, document_id) {
  await db.query(
    `INSERT INTO stock (product_id, location_id, quantity)
     VALUES ($1,$2,$3)
     ON CONFLICT (product_id, location_id)
     DO UPDATE SET quantity = stock.quantity + $3`,
    [product_id, location_id, delta]
  );
  await db.query(
    `INSERT INTO stock_ledger (product_id, location_id, quantity_delta, document_id)
     VALUES ($1,$2,$3,$4)`,
    [product_id, location_id, delta, document_id]
  );
}

exports.list = async (req, res) => {
  const { type } = req.query; // to pass ?type=receipt
  
  // You will need a query that joins stock_document, partner (for FROM), 
  // location (for DESTINATION), and aggregates stock_document_line (for PRODUCTS)
  const result = await db.query(`
    SELECT 
      sd.id, sd.reference, sd.created_at, sd.status,
      p.name AS from_partner,
      l.name AS dest_location,
      COUNT(sdl.id) AS products_count
    FROM stock_document sd
    LEFT JOIN partner p ON sd.partner_id = p.id
    LEFT JOIN location l ON sd.dest_location_id = l.id
    LEFT JOIN stock_document_line sdl ON sd.id = sdl.document_id
    WHERE sd.type = $1
    GROUP BY sd.id, p.name, l.name
    ORDER BY sd.created_at DESC
  `, [type]);
  
  res.json({ documents: result.rows });
};