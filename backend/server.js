const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. IMPORT ROUTES
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const warehouseRoutes = require('./src/routes/warehouseRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const partnerRoutes = require('./src/routes/partnerRoutes');
const reorderingRuleRoutes = require('./src/routes/reorderingRulesRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

// =========================
// 2. MIDDLEWARE (MUST BE BEFORE ROUTES)
// =========================
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

// =========================
// 3. MOUNT ROUTES
// =========================
// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'StockSense API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/reordering-rules', reorderingRuleRoutes);
app.use('/api/dashboard', dashboardRoutes); // ✅ Now protected by CORS!

// =========================
// 4. START SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`StockSense server running on http://localhost:${PORT}`);
});