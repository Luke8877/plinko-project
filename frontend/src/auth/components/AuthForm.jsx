/**
 * Auth Form Component
 * ---------------------------------------------------------
 * Unified Login/Register UI for the PlinkOink app.
 * Centralizes authentication UX — reduces duplication
 * and maintains consistent styling across auth flows.
 *
 * Responsibilities:
 * • Collect username/password input
 * • Handle login OR registration based on "mode"
 * • Persist JWT token to localStorage upon success
 * • Display user-friendly error feedback
 * • Redirect authenticated users to their dashboard
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@services/authService.js';

/**
 * Manages controlled form inputs and provides quick
 * mode switching between "login" and "register"
 * while reusing the same layout and interaction pattern.
 */
export default function AuthForm() {
  const [mode, setMode] = useState('login'); // login or register mode
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  /**
   * Submit form to backend auth endpoints.
   * Stores JWT token and transitions user
   * into protected app flow upon validation.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Choose endpoint dynamically based on current mode
      const endpoint = mode === 'login' ? 'login' : 'register';
      const res = await authService[endpoint]({ username, password });

      // Persist token for authenticated API usage
      localStorage.setItem('token', res.token);

      // Navigate into protected app workspace
      navigate('/dashboard');
    } catch (err) {
      // Display backend-provided message or fallback error
      setError(err.response?.data?.msg || 'Authentication failed.');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Backend error feedback */}
      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      {/* Username input (controlled) */}
      <input
        type="text"
        placeholder="Username"
        className="bg-surfaceDark border border-brandPink/40 rounded-lg px-3 py-2 focus:outline-none focus:border-brandPink"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Password input (controlled) */}
      <input
        type="password"
        placeholder="Password"
        className="bg-surfaceDark border border-brandPink/40 rounded-lg px-3 py-2 focus:outline-none focus:border-brandPink"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Submit CTA (text varies by mode) */}
      <button
        type="submit"
        className="bg-brandPink text-black py-2 rounded-full font-semibold hover:scale-[1.02] transition-transform"
      >
        {mode === 'login' ? 'Login' : 'Create Account'}
      </button>

      {/* Inline route switcher (login ⇆ register) */}
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
