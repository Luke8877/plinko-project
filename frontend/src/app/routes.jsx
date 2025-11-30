import { Navigate } from 'react-router-dom';

import LoginPage from '@auth/pages/LoginPage.jsx';
import GamePage from '@features/game/pages/GamePage.jsx';
import DashboardPage from '@/features/dashboard/pages/DashboardPage.jsx';
import StatsPage from '@/features/stats/pages/StatsPage.jsx';
import ProtectedRoute from '@shared/components/ProtectedRoute.jsx';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/game',
    element: (
      <ProtectedRoute>
        <GamePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/stats',
    element: (
      <ProtectedRoute>
        <StatsPage />
      </ProtectedRoute>
    ),
  },
];
