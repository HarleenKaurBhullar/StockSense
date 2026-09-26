const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();


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


// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `StockSense server running on http://localhost:${PORT}`
  );
});