/**
 * Database Connection
 * --------------------------------------------------
 * Establishes a connection to MongoDB using Mongoose.
 * Keeps DB config isolated and ensures the app fails
 * fast if a connection cannot be made.
 */

import mongoose from 'mongoose';

/**
 * Connect to MongoDB
 * --------------------------------------------------
 * - Uses MONGO_URI from environment variables
 * - Logs success or detailed error for debugging
 * - Exits process if connection fails
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Stop server if DB is not available
  }
};

// Export connection utility for centralized DB management
export default connectDB;
