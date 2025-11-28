/**
 * Game Page - Plinko Board
 * --------------------------------------------------
 * Allows the user to place a bet, drop the game ball,
 * and receive updated balance/results from the backend.
 *
 * UI + game logic will evolve through multiple iterations,
 * starting with a functional bet workflow.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';
import GameBoard from '../components/GameBoard.jsx';

export default function GamePage() {
  const [bet, setBet] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePlay = async () => {
    setMessage('');

    if (!bet || bet <= 0) {
      return setMessage('Please enter a valid bet amount.');
    }

    try {
      const res = await authService.playGame({ bet: Number(bet) });
      setMessage(
        `Multiplier: x${res.multiplier} • New Balance: $${res.newBalance}`
      );
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to play game.');
    }
  };

  return (
    <div className="min-h-screen bg-surfaceDark text-slate-100 p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-brandPink">
        PlinkOink Game 🎮
      </h1>

      {/* Bet Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Enter bet"
          className="bg-cardDark border border-brandPink/40 rounded-lg px-3 py-2 w-32"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
        />
        <button
          onClick={handlePlay}
          className="bg-brandPink text-black px-6 rounded-full font-semibold hover:scale-[1.03] transition-transform"
        >
          Drop!
        </button>
      </div>

      {message && <p className="text-brandPink mb-6">{message}</p>}

      {/* Plinko Board */}
      <div className="bg-cardDark w-full max-w-md h-[560px] rounded-xl border border-brandPink/30 p-4">
        <GameBoard />
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="underline text-brandPink text-sm mt-8"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
