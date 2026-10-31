// On-brand SVG banner art for proprietary projects (no screenshots allowed).
// variant: 'migrate'  — flowing nodes between two systems
//          'dashboard'— bar/kpi motif (also the default)
//          'gateway'  — one endpoint fanning out to many models
//          'agents'   — a lead node delegating to a team of specialists
const art = {
  migrate: (
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
  ),
  gateway: (
    <svg viewBox="0 0 200 80" className="relative h-24 w-auto" fill="none" aria-hidden="true">
      {/* single endpoint on the left */}
      <rect x="18" y="28" width="34" height="24" rx="6" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="35" cy="40" r="5" fill="#3b82f6" opacity="0.85" />
      {/* fan-out lines to many models */}
      <path d="M52 40 H92 M92 40 C116 40 116 16 150 16 M92 40 C116 40 116 32 150 32 M92 40 C116 40 116 48 150 48 M92 40 C116 40 116 64 150 64"
        stroke="url(#gbg)" strokeWidth="2" strokeDasharray="5 4" />
      <circle cx="92" cy="40" r="3.5" fill="#8b5cf6" />
      {/* model nodes on the right */}
      {[16, 32, 48, 64].map((y) => (
        <g key={y}>
          <rect x="150" y={y - 7} width="30" height="14" rx="4" stroke="#22d3ee" strokeWidth="1.8" />
          <circle cx="165" cy={y} r="3" fill="#22d3ee" opacity="0.85" />
        </g>
      ))}
      <defs>
        <linearGradient id="gbg" x1="52" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  ),
  agents: (
    <svg viewBox="0 0 200 80" className="relative h-24 w-auto" fill="none" aria-hidden="true">
      {/* lead / brain node */}
      <rect x="84" y="8" width="32" height="18" rx="6" stroke="#8b5cf6" strokeWidth="2" />
      <circle cx="100" cy="17" r="4" fill="#8b5cf6" opacity="0.85" />
      {/* hand-offs down to the team */}
      <path d="M100 26 C100 40 56 40 56 52 M100 26 L100 52 M100 26 C100 40 144 40 144 52"
        stroke="url(#gba)" strokeWidth="2" strokeDasharray="5 4" />
      {/* specialist nodes */}
      {[56, 100, 144].map((x) => (
        <g key={x}>
          <rect x={x - 16} y="52" width="32" height="18" rx="5" stroke="#22d3ee" strokeWidth="1.8" />
          <circle cx={x} cy="61" r="3" fill="#22d3ee" opacity="0.85" />
        </g>
      ))}
      <defs>
        <linearGradient id="gba" x1="56" y1="26" x2="144" y2="61" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  ),
  dashboard: (
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
  ),
}

export default function GradientBanner({ variant, className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0d1b3d 0%, #12275e 45%, #0b3a52 100%)' }}
    >
      <div className="dot-grid absolute inset-0" />
      {art[variant] || art.dashboard}
    </div>
  )
}
