/**
 * Dashboard Page
 * --------------------------------------------------
 * Main authenticated landing screen.
 *
 * Shows:
 *  - User balance
 *  - Quick performance stats
 *  - Navigation to gameplay + detailed stats
 *
 * Data is loaded on mount from the backend via the
 * report endpoint, ensuring stats remain up-to-date.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@services/authService.js';

export default function DashboardPage() {
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetch the user's performance stats as soon as they load
   * into the dashboard. If the request fails, the dashboard
   * remains visible but without populated metrics.
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await authService.getReport();
        setReport(data);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    }
    fetchData();
  }, []);

  /**
   * Clears JWT → returns user to login screen.
   * Required for fully testing the authentication lifecycle.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surfaceDark text-slate-100 p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-brandPink">
        Welcome to PlinkOink 🐷
      </h1>

      {/* Balance Card */}
      <div className="bg-cardDark rounded-2xl p-6 w-full max-w-md text-center shadow-glow border border-brandPink/40 mb-6">
        <h2 className="text-xl font-semibold mb-2">Balance</h2>
        <p className="text-4xl font-bold text-brandPink">
          ${report?.balance ?? '----'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="bg-cardDark rounded-2xl p-5 w-full max-w-md text-center border border-brandPink/30 mb-6">
        <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
        {report ? (
          <div className="flex justify-around text-sm">
            <div>
              <p className="text-brandPink font-bold">{report.totalGames}</p>
              <p>Total Games</p>
            </div>
            <div>
              <p className="text-brandPink font-bold">{report.winLossRatio}%</p>
              <p>Win Rate</p>
            </div>
            <div>
              <p className="text-brandPink font-bold">${report.biggestWin}</p>
              <p>Biggest Win</p>
            </div>
          </div>
        ) : (
          <p>Loading stats...</p>
        )}
      </div>

      {/* Navigation */}
      <button
        onClick={() => navigate('/game')}
        className="bg-brandPink text-black px-6 py-3 rounded-full font-semibold hover:scale-[1.03] transition-transform mb-3"
      >
        Play PlinkOink 🎮
      </button>

      <button
        onClick={() => navigate('/stats')}
        className="underline text-brandPink text-sm mb-6"
      >
        View Full Stats →
      </button>

      {/* Logout */}
      <button onClick={handleLogout} className="text-red-400 underline text-sm">
        Logout
      </button>
    </div>
  );
}
