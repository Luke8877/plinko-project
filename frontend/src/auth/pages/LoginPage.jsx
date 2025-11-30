/**
 * Login Page
 * --------------------------------------------------
 * Public entry point for the application.
 * Renders the branded login card and authentication form.
 */

import AuthForm from '@auth/components/AuthForm';

/**
 * Page wrapper for login/register UI
 * (keeps layout styling separate from form logic)
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surfaceDark text-slate-100">
      {/* Auth card container */}
      <div className="bg-cardDark px-8 py-10 rounded-3xl shadow-glow border border-brandPink/40 w-[360px]">
        {/* App branding */}
        <h1 className="text-3xl font-bold text-brandPink mb-4 text-center">
          PlinkOink
        </h1>

        {/* Login/Register toggle form */}
        <AuthForm />
      </div>
    </div>
  );
}
