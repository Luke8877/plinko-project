/**
 * App Route Config (Centralized)
 * ---------------------------------------------------------
 * Provides a single source of truth for all navigation
 * within the PlinkOink frontend. Each route entry defines:
 * • Path in the URL
 * • Component to render
 * • Access rules (public vs protected)
 *
 * Benefits of centralized routing:
 * • Easier navigation updates (add/remove routes in one place)
 * • Cleaner App.jsx for readability
 * • Foundation for future dynamic routing if needed
 *
 * Access Rules:
 * • Public: /login
 * • Protected: /dashboard, /game, /stats
 * • Root: Redirects to dashboard for authenticated users
 */

import { Navigate } from 'react-router-dom';

import LoginPage from '@auth/pages/LoginPage.jsx';
import GamePage from '@features/game/pages/GamePage.jsx';
import DashboardPage from '@/features/dashboard/pages/DashboardPage.jsx';
import StatsPage from '@/features/stats/pages/StatsPage.jsx';
import ProtectedRoute from '@shared/components/ProtectedRoute.jsx';

export const routes = [
  /**
   * Default redirect route
   * Redirect root path to protected dashboard
   * (Users without valid JWT will be redirected to /login by ProtectedRoute)
   */
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  /**
   * Public authentication access
   * Login + registration interface
   */
  {
    path: '/login',
    element: <LoginPage />,
  },

  /**
   * Protected user dashboard
   * Includes balance, quick stats, and leaderboard preview
   */
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  /**
   * Protected Plinko gameplay route
   * Core interactive feature (MVP)
   */
  {
    path: '/game',
    element: (
      <ProtectedRoute>
        <GamePage />
      </ProtectedRoute>
    ),
  },

  /**
   * Protected statistics route
   * Currently minimal — future expansion planned
   */
  {
    path: '/stats',
    element: (
      <ProtectedRoute>
        <StatsPage />
      </ProtectedRoute>
    ),
  },
];
