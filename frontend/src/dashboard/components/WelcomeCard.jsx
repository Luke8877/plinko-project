/**
 * WelcomeCard Component
 * ---------------------------------------------------------
 * Greets the authenticated user by name on the dashboard.
 * Fetches profile data from backend on mount and updates UI.
 *
 * Responsibilities:
 * • Provide a personalized welcome message
 * • Enhance onboarding experience with playful visuals
 * • Gracefully fall back to generic name if user data is unavailable
 *
 * Data Source:
 * • /api/auth/profile → username fetched via authService
 */

import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';
import { useState, useEffect } from 'react';
import authService from '@services/authService';

/**
 * MVP Implementation Notes:
 * • Username stored locally — no need for global context yet
 * • Safe fallback prevents UI break from failed requests
 */
export default function WelcomeCard() {
  const [username, setUsername] = useState('Friend'); // Safe default

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await authService.getProfile();
        setUsername(data.username);
      } catch {
        setUsername('Friend'); // Graceful fallback if token expired or missing
      }
    }
    loadUser();
  }, []);

  return (
    <BaseCard className="row-start-1 col-start-1 relative overflow-hidden">
      {/* Personalized welcome message */}
      <div className="flex flex-col items-center justify-center text-center gap-1 z-10">
        <h2 className="text-2xl font-bold text-brandPink">
          Welcome {username}!
        </h2>
        <p className="text-sm text-slate-300 opacity-80">Feeling Lucky?</p>
      </div>

      {/* Decoration */}
      <PigMascot
        size={60}
        className="absolute bottom-[-6px] left-[-10px] rotate-[35deg] opacity-90"
      />
      <PigMascot
        size={60}
        className="absolute bottom-[-6px] right-[-10px] rotate-[-35deg] opacity-90"
      />
    </BaseCard>
  );
}
