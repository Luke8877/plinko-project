/**
 * Protected Route Wrapper
 * --------------------------------------------------
 * Restricts access to authenticated users only.
 *
 * Any route wrapped by this component will:
 * - Check for a valid JWT token stored in localStorage
 * - Redirect unauthenticated users back to the login page
 *
 * This ensures that private views (dashboard, stats, game)
 * cannot be accessed manually via URL without logging in.
 */

import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // If no token found, user is not logged in → reroute them
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, allow access to protected page
  return children;
}
