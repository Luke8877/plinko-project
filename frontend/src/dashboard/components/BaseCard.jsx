/**
 * BaseCard Component
 * ---------------------------------------------------------
 * Reusable card container that standardizes dashboard
 * visual styling and layout spacing throughout the app.
 *
 * Responsibilities:
 * • Provide consistent card-like appearance (rounded corners,
 *   brand glow, background tone, spacing)
 * • Accept custom styling overrides via className
 * • Wrap arbitrary child content passed from parent components
 *
 * Usage:
 * <BaseCard className="custom-grid-position">
 *   <SomeContent />
 * </BaseCard>
 */

export default function BaseCard({ children, className = '' }) {
  return (
    <div
      className={`
        bg-cardDark
        rounded-xl
        border border-brandPink/20
        shadow-[0_0_18px_rgba(255,77,141,0.18)]
        p-6
        flex flex-col justify-center items-center
        text-slate-100
        ${className}
      `}
    >
      {/* Render injected content from parent */}
      {children}
    </div>
  );
}
