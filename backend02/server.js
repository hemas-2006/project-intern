require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB          = require('./config/db');
const taskRoutes         = require('./routes/tasks');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// ── Connect to MongoDB ─────────────────────────────────────────────────────────
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Request Logger (dev) ───────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ── Health Check ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  const mongoose = require('mongoose');
  res.status(200).json({
    success: true,
    message: 'ClientFlow API is running',
    dbState: mongoose.STATES[mongoose.connection.readyState],
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/tasks', taskRoutes);

// ── Root ───────────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    message: '🚀 ClientFlow API',
    version: '1.0.0',
    endpoints: {
      health:  'GET  /api/health',
      tasks:   'GET  /api/tasks',
      stats:   'GET  /api/tasks/stats',
      create:  'POST /api/tasks',
      getOne:  'GET  /api/tasks/:id',
      update:  'PUT  /api/tasks/:id',
      toggle:  'PATCH /api/tasks/:id/toggle',
      delete:  'DELETE /api/tasks/:id',
      clearCompleted: 'DELETE /api/tasks?completed=true',
    },
  });
});

// ── Error Handling ─────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 ClientFlow Backend running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   API Base:    http://localhost:${PORT}/api\n`);
});