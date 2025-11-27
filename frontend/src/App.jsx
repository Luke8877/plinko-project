/**
 * App Router
 * --------------------------------------------------
 * Defines all major views and access levels for the app.
 *
 * Public Route:
 *   /login      - Authentication screen (login/register)
 *
 * Protected Routes (require JWT token):
 *   /dashboard  - User balance, leaderboard preview, game entry (MVP)
 *
 * Default:
 *   Root path (/) redirects to login unless authenticated
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import GamePage from './pages/GamePage.jsx';
import StatsPage from './pages/StatsPage.jsx'; // will create placeholder next

function App() {
  return (
    <Router>
      <Routes>
        {/* Public authentication route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected authenticated dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Game page */}
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />

        {/* Stats page */}
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
