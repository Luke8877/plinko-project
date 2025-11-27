/**
 * App Router
 * --------------------------------------------------
 * Defines the main client-side routes for the application.
 *
 * /login     - Public access screen for authentication
 * /dashboard - Protected screen (requires valid login)
 *
 * Root path (/) auto-redirects users to the login page.
 * Protected route enforcement will be added during the
 * dashboard integration milestone.
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route -> login screen */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Landing Page */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
