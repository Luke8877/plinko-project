/**
 * Login Page
 * --------------------------------------------------
 * Public entry point for the application.
 * Renders the branded login card and authentication form.
 */

import AuthForm from '@auth/components/AuthForm';
import FloatingPig from '@shared/components/FloatingPig';
import CornerPig from "@shared/components/CornerPig.jsx";


/**
 * Page wrapper for login/register UI
 * (keeps layout styling separate from form logic)
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surfaceDark text-slate-100 relative overflow-hidden">

      {/* corner themed pigs */}
      <CornerPig corner="bottom-left" size={120} />
      <CornerPig corner="top-right" size={90} />
      
  {/* Floating Pig Mascots */}
  <FloatingPig className="absolute top-10 left-10 opacity-80" size={90} />
  <FloatingPig className="absolute bottom-10 right-10 opacity-80" size={90} />

  {/* Auth card container */}
  <div className="bg-cardDark px-8 py-10 rounded-3xl shadow-glow border border-brandPink/40 w-[360px] relative z-10">
    <h1 className="text-3xl font-bold text-brandPink mb-4 text-center">
      PlinkOink
    </h1>
    <AuthForm />
  </div>
</div>
  );
}
