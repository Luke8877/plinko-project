/**
 * ProtectedRoute Component
 * --------------------------------------------------
 * Restricts access to authenticated users only.
 *
 * Behavior:
 * - Checks for a valid JWT token stored in localStorage
 * - If missing, user is redirected to the /login page
 *
 * Notes:
 * - This only checks presence of a token, not validity/expiration.
 *   (Server-side protects endpoints — this is purely a UX gate.)
 * - Future improvement: preserve attempted URL and redirect back
 *   after successful login.
 */

import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // No token → block access and reroute to login screen
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Allow entry into protected area
  return children;
}
