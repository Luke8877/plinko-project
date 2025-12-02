/**
 * Server Entry Point
 * -------------------------
 * Initializes the Express application, connects to MongoDB,
 * configures global middleware, and mounts all API routes.
 * Acts as the central hub for the PlinkOink backend server.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routeBundle from './routes/index.js';

const { authRoutes, gameRoutes, reportRoutes, leaderboardRoutes } = routeBundle;

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using Mongoose
connectDB();

// Initialize Express app instance
const app = express();

// -------------------------
// Global Middleware
// -------------------------

// Enable Cross-Origin Resource Sharing for frontend communication
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// -------------------------
// Route Mounting
// -------------------------

// Authentication endpoints (/api/auth/register, /api/auth/login)
app.use('/api/auth', authRoutes);

// Game endpoints (/api/game/play, etc.)
app.use('/api/game', gameRoutes);

// Reporting endpoints (/api/report)
app.use('/api/report', reportRoutes);

// leaderboard endpoints(/api/leaderboard)
app.use('/api/leaderboard', leaderboardRoutes);

// Health check / test route
app.get('/', (req, res) => {
  res.send('Server and MongoDB are running!');
});

// -------------------------
// Server Initialization
// -------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
