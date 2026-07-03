// On-brand SVG banner art for proprietary projects (no screenshots allowed).
// variant: 'migrate' (flowing nodes between two systems) | 'dashboard' (bar/kpi motif)
export default function GradientBanner({ variant, className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0d1b3d 0%, #12275e 45%, #0b3a52 100%)' }}
    >
      <div className="dot-grid absolute inset-0" />
      {variant === 'migrate' ? (
        <svg viewBox="0 0 200 80" className="relative h-24 w-auto" fill="none" aria-hidden="true">
          <rect x="8" y="20" width="44" height="40" rx="8" stroke="#3b82f6" strokeWidth="2" />
          <rect x="148" y="20" width="44" height="40" rx="8" stroke="#22d3ee" strokeWidth="2" />
          <path d="M60 32 H140 M60 48 H140" stroke="url(#gb1)" strokeWidth="2" strokeDasharray="6 5" />
          <path d="M132 26 l10 6 -10 6 M132 42 l10 6 -10 6" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="40" r="6" fill="#3b82f6" opacity="0.8" />
          <circle cx="170" cy="40" r="6" fill="#22d3ee" opacity="0.8" />
          <defs>
            <linearGradient id="gb1" x1="60" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg viewBox="0 0 200 80" className="relative h-24 w-auto" fill="none" aria-hidden="true">
          <rect x="20" y="12" width="160" height="56" rx="8" stroke="#3b82f6" strokeWidth="2" />
          <rect x="34" y="44" width="12" height="14" rx="2" fill="#3b82f6" opacity="0.9" />
          <rect x="52" y="34" width="12" height="24" rx="2" fill="#60a5fa" opacity="0.9" />
          <rect x="70" y="26" width="12" height="32" rx="2" fill="#22d3ee" opacity="0.9" />
          <path d="M100 52 L120 38 L136 44 L162 24" stroke="url(#gb2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="162" cy="24" r="4" fill="#22d3ee" />
          <rect x="34" y="20" width="40" height="5" rx="2.5" fill="#3b82f6" opacity="0.5" />
          <defs>
            <linearGradient id="gb2" x1="100" y1="52" x2="162" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  )
}
