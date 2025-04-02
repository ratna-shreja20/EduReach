const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Route files
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server startup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;