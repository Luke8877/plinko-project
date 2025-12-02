/**
 * Login Page
 * --------------------------------------------------
 * Public entry point for the application.
 * Renders the branded login card and authentication form.
 */

import AuthForm from '@auth/components/AuthForm';
import FloatingPig from '@shared/components/FloatingPig';
import CornerPig from '@shared/components/CornerPig.jsx';
import PigMascot from '@shared/components/PigMascot.jsx';

/**
 * Page wrapper for login/register UI
 * (keeps layout styling separate from form logic)
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surfaceDark text-slate-100 relative overflow-hidden">
      {/* corner pigs */}
      <CornerPig topRight bottomLeft topLeft bottomRight />

      {/* floating pigs */}
      <FloatingPig size={90} />

      {/* Auth card */}
      <div className="bg-cardDark px-8 py-10 rounded-3xl shadow-glow border border-brandPink/40 w-[360px] relative z-10">
        {/* Title with pig mascot */}
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
