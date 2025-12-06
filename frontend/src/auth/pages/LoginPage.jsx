/**
 * Login Page
 * ---------------------------------------------------------
 * Public entry point for the PlinkOink application.
 * Presents the authentication UI within a branded,
 * playful theme using floating mascots and corner pigs.
 *
 * Responsibilities:
 * • Provide the login/register form container
 * • Apply full-screen background + centering layout
 * • Maintain visual identity for the onboarding experience
 */

import AuthForm from '@auth/components/AuthForm';
import FloatingPig from '@shared/components/FloatingPig';
import CornerPig from '@shared/components/CornerPig.jsx';
import PigMascot from '@shared/components/PigMascot.jsx';

/**
 * Page-level layout only — authentication logic handled
 * inside <AuthForm /> to keep responsibilities separated.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surfaceDark text-slate-100 relative overflow-hidden">
      {/* Decorative corner pigs */}
      <CornerPig topRight bottomLeft topLeft bottomRight />

      {/* Floating pig animations */}
      <FloatingPig size={90} />

      {/* Auth Card Container */}
      <div className="bg-cardDark px-8 py-10 rounded-3xl shadow-glow border border-brandPink/40 w-[360px] relative z-10">
        {/* Logo / Title section */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <PigMascot size={36} className="opacity-95" />
          <h1 className="text-3xl font-bold text-brandPink">PlinkOink</h1>
          <PigMascot size={36} className="opacity-95" />
        </div>

        <AuthForm />
      </div>
    </div>
  );
}
