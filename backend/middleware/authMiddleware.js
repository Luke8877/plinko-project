/**
 * Authentication Middleware
 * ---------------------------------------------------------
 * Validates incoming requests by checking for a valid JWT.
 * Ensures only authenticated users can access protected routes.
 * Behavior:
 * • Extract token from Authorization header
 * • Verify token signature & expiration
 * • Attach decoded user ID to req.user for downstream access
 */

import jwt from 'jsonwebtoken';

/**
 * Protect private routes by requiring JWT authentication.
 *
 * @middleware
 * @access Private routes only
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  // Extract the JWT from "Bearer <token>" format
  const token = authHeader.split(' ')[1];

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request for use in controllers
    req.user = decoded.id;

    next(); // User authenticated → proceed to protected route handler
  } catch (err) {
    // Token missing, malformed, or expired
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};
