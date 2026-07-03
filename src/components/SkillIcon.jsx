// Inline stroke icons for the skills bento grid, keyed by name.
const paths = {
  pipeline: (
    <>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M7.2 6h9.6M5 8.2v7.6M19 8.2v7.6M7.2 18h9.6" />
    </>
  ),
  migrate: (
    <>
      <rect x="2.5" y="7" width="7" height="10" rx="1.5" />
      <rect x="14.5" y="7" width="7" height="10" rx="1.5" />
      <path d="M10.5 10.5h3m-3 3h3M12 9l1.8 1.5L12 12m0 0l1.8 1.5L12 15" />
    </>
  ),
  app: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 13v4m4-6v6m4-3v3" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z" />
      <path d="M18.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 01-.4-9A6 6 0 0118 8.5 4 4 0 0117.5 18z" />
      <path d="M9 14.5h6m-6 0l1.5-1.5M9 14.5l1.5 1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
}

export default function SkillIcon({ name, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#skill-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="skill-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {paths[name]}
    </svg>
  )
}
