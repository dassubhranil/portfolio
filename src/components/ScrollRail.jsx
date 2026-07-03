import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

// Interactive scroll rail, drawn as a winding S-curve instead of a straight
// line. A leaf indicator drifts down the curve as you scroll — swaying left
// and right and rotating with the bends, like a leaf falling. Section dots
// sit on the curve; the active one glows and shows its label. Hidden below lg.

const W = 44
const H = 380
// Gentle sine wave from top to bottom (quadratic segments; T mirrors controls)
const PATH = `M 22 6 Q 42 38 22 70 T 22 134 T 22 198 T 22 262 T 22 326 T 22 374`

function Leaf({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="leaf-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* Simple leaf: two arcs meeting at the tip + a midrib */}
      <path d="M12 2 C 20 6, 22 15, 12 22 C 2 15, 4 6, 12 2 Z" fill="url(#leaf-grad)" opacity="0.9" />
      <path d="M12 4.5 V 19.5" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}

export default function ScrollRail({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)
  const [dots, setDots] = useState([])
  const pathRef = useRef(null)
  const reduce = useReducedMotion()

  // Leaf position: page scroll progress → distance along the curve
  const { scrollYProgress } = useScroll()
  const eased = useSpring(scrollYProgress, { stiffness: 60, damping: 18, mass: 0.8 })
  const offsetDistance = useTransform(eased, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  // Place one dot per section, evenly spaced along the curve
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    const n = sections.length
    setDots(
      sections.map(({ id, label }, i) => {
        const p = path.getPointAtLength((n === 1 ? 0 : i / (n - 1)) * len)
        return { id, label, x: p.x, y: p.y }
      }),
    )
  }, [sections])

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <nav
      className="fixed right-4 z-40 hidden lg:block"
      aria-label="Section navigation"
      style={{ width: W, height: H, top: `calc(50% - ${H / 2}px)` }}
    >
      {/* The winding track */}
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} fill="none" className="absolute inset-0">
        <defs>
          <linearGradient id="rail-grad" x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(59,130,246,0.5)" />
            <stop offset="0.5" stopColor="rgba(139,92,246,0.35)" />
            <stop offset="1" stopColor="rgba(34,211,238,0.25)" />
          </linearGradient>
        </defs>
        <path ref={pathRef} d={PATH} stroke="url(#rail-grad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" />
      </svg>

      {/* Falling-leaf indicator: follows the curve, rotating with its bends */}
      <motion.div
        className="absolute left-0 top-0"
        style={{
          offsetPath: `path("${PATH}")`,
          offsetDistance,
          offsetRotate: 'auto 90deg',
        }}
      >
        <motion.div
          animate={reduce ? undefined : { rotate: [-14, 14, -14] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Leaf className="h-5 w-5 drop-shadow-[0_0_8px_rgba(139,92,246,0.9)]" />
        </motion.div>
      </motion.div>

      {/* Section dots on the curve */}
      {dots.map(({ id, label, x, y }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => jump(id)}
            className="group absolute flex items-center"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
            aria-label={`Jump to ${label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`pointer-events-none absolute right-5 whitespace-nowrap rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide backdrop-blur-sm transition-all duration-300 ${
                isActive
                  ? 'translate-x-0 border-accent/40 bg-accent/10 text-accent opacity-100'
                  : 'translate-x-2 border-line bg-surface/80 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-2.5 w-2.5 bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_10px_rgba(59,130,246,0.9)]'
                  : 'h-1.5 w-1.5 bg-faint group-hover:h-2 group-hover:w-2 group-hover:bg-muted'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
