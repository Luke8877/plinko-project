import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';
import { useState, useEffect } from 'react';
import authService from '@services/authService';

export default function WelcomeCard() {
  const [username, setUsername] = useState('Friend');

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await authService.getProfile();
        setUsername(data.username);
      } catch {
        setUsername('Friend');
      }
    }
    loadUser();
  }, []);

  return (
    <BaseCard className="row-start-1 col-start-1 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center gap-1 z-10">
        <h2 className="text-2xl font-bold text-brandPink">
          Welcome {username}!
        </h2>
        <p className="text-sm text-slate-300 opacity-80">Feeling Lucky?</p>
      </div>

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
