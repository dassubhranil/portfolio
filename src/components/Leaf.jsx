// Brand leaf mark — used by the scroll rail, landing page, and favicon.
export default function Leaf({ className, id = 'leaf-grad' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M12 2 C 20 6, 22 15, 12 22 C 2 15, 4 6, 12 2 Z" fill={`url(#${id})`} opacity="0.9" />
      <path d="M12 4.5 V 19.5" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}
