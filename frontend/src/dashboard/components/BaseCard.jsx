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
      {children}
    </div>
  );
}
