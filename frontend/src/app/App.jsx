/**
 * App Router
 * ---------------------------------------------------------
 * Defines the navigation structure and access rules for the
 * PlinkOink frontend. All protected routes require valid JWT
 * authentication, enforced by the ProtectedRoute wrapper.
 *
 * Public Route:
 * • /login      - Authentication screen (login/register)
 *
 * Protected Routes:
 * • /dashboard  - User dashboard: balance, leaderboard, quick stats
 * • /game       - PlinkOink gameplay experience (core MVP feature)
 * • /stats      - Detailed statistics + session history (future)
 *
 * Default Rule:
 * • Root path (/) redirects to /login unless authenticated
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from '@auth/pages/LoginPage.jsx';
import DashboardPage from '@dashboard/pages/DashboardPage.jsx';
import GamePage from '@game/pages/GamePage.jsx';
import StatsPage from '@stats/pages/StatsPage.jsx';
import ProtectedRoute from '@shared/components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Authentication Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Game Route */}
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />

        {/* Protected Stats Route */}
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect Behavior */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
