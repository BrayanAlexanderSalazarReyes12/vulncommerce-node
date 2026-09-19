const express = require('express');
const path = require('path');

const { optionalAuth } = require('./auth');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const fileRoutes = require('./routes/fileRoutes');
const systemRoutes = require('./routes/systemRoutes');
const networkRoutes = require('./routes/networkRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LAB-CORS-101: CORS deliberadamente permisivo.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(optionalAuth);

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', redirectRoutes);
app.use('/api', fileRoutes);
app.use('/api', systemRoutes);
app.use('/api', networkRoutes);

app.use(express.static(path.join(__dirname, '..', 'public')));

// LAB-INFO-101: manejador global devuelve el stack completo.
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl
  });
});

module.exports = app;
