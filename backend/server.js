const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');

const app = express();
const categoryRoutes = require('./src/routes/categoryRoutes');
const warehouseRoutes = require('./src/routes/warehouseRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const partnerRoutes = require('./src/routes/partnerRoutes');
const reorderingRuleRoutes = require('./src/routes/reorderingRuleRoutes');

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());


// =========================
// BASIC TEST ROUTE
// =========================

app.get('/', (req, res) => {
  res.json({
    message: 'StockSense API is running',
  });
});


// =========================
// AUTH ROUTES
// =========================

app.use(
  '/api/auth',
  authRoutes
);
app.use('/api/categories', categoryRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/reordering-rules', reorderingRuleRoutes);


// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `StockSense server running on http://localhost:${PORT}`
  );
});