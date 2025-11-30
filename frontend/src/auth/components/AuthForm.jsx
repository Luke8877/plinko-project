/**
 * Auth Form Component
 * --------------------------------------------------
 * Handles both Login and Register flows inside one UI.
 * Keeps authentication logic centralized instead of spread
 * across multiple pages or components.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@services/authService.js';

/**
 * Switching form mode enables reuse of input elements and styling.
 * Local state keeps fields controlled + error feedback visible.
 */
export default function AuthForm() {
  const [mode, setMode] = useState('login'); // login or register mode
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  /**
   * Handle submission to either login or register endpoint.
   * Stores JWT token when successful and redirects user
   * into authenticated area of the app (Dashboard).
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Mode determines which API function is invoked
      const endpoint = mode === 'login' ? 'login' : 'register';
      const res = await authService[endpoint]({ username, password });

      // Persist token for future authenticated requests
      localStorage.setItem('token', res.token);

      // Redirect to protected route
      navigate('/dashboard');
    } catch (err) {
      // Graceful error feedback for invalid credentials/username taken
      setError(err.response?.data?.message || 'Authentication failed.');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Inline API error display */}
      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      {/* Controlled username input */}
      <input
        type="text"
        placeholder="Username"
        className="bg-surfaceDark border border-brandPink/40 rounded-lg px-3 py-2 focus:outline-none focus:border-brandPink"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Controlled password input */}
      <input
        type="password"
        placeholder="Password"
        className="bg-surfaceDark border border-brandPink/40 rounded-lg px-3 py-2 focus:outline-none focus:border-brandPink"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Action button updates text based on mode */}
      <button
        type="submit"
        className="bg-brandPink text-black py-2 rounded-full font-semibold hover:scale-[1.02] transition-transform"
      >
        {mode === 'login' ? 'Login' : 'Create Account'}
      </button>

      {/* Mode toggle (login <-> register) */}
      <p
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        className="text-sm text-brandPink cursor-pointer text-center hover:underline"
      >
        {mode === 'login'
          ? 'Don’t have an account? Sign up'
          : 'Already have an account? Log in'}
      </p>
    </form>
  );
}
