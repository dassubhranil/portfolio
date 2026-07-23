import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Leaf from './Leaf'

// Full-screen landing gate shown on first visit of a session. It's a brand
// moment, not a toll booth: content paints immediately, the site auto-enters
// after AUTO_ENTER_MS (countdown ring around the leaf), and any input —
// click, scroll, touch, or key — skips straight in.
const AUTO_ENTER_MS = 2400

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.6, 0.35, 1] } },
}

// Deterministic pseudo-random leaf placements
const LEAVES = Array.from({ length: 9 }, (_, i) => ({
  left: `${(i * 37 + 11) % 96}%`,
  size: 14 + ((i * 13) % 18),
  duration: 11 + ((i * 7) % 9),
  delay: -((i * 3.3) % 12),
  sway: 30 + ((i * 17) % 50),
}))

// Countdown ring geometry (r=33 → circumference ≈ 207.3)
const RING_R = 33
const RING_C = 2 * Math.PI * RING_R

export default function Landing({ onEnter }) {
  const reduce = useReducedMotion()
  const entered = useRef(false)

  // Auto-enter after the countdown; any input skips immediately
  useEffect(() => {
    const enter = () => {
      if (entered.current) return
      entered.current = true
      onEnter()
    }
    const timer = setTimeout(enter, AUTO_ENTER_MS)
    const opts = { passive: true }
    window.addEventListener('keydown', enter)
    window.addEventListener('wheel', enter, opts)
    window.addEventListener('touchmove', enter, opts)
    window.addEventListener('pointerdown', enter, opts)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', enter)
      window.removeEventListener('wheel', enter)
      window.removeEventListener('touchmove', enter)
      window.removeEventListener('pointerdown', enter)
    }
  }, [onEnter])

  return (
    <motion.div
      key="landing"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-base"
    >
      <div className="hero-glow absolute inset-0" />
      <div className="dot-grid absolute inset-0" />
      <div className="aurora left-[10%] top-[15%] h-80 w-80" style={{ background: '#3b82f6' }} />
      <div className="aurora right-[10%] top-[10%] h-96 w-96" style={{ background: '#8b5cf6', animationDelay: '-6s' }} />
      <div className="aurora bottom-[10%] left-[30%] h-72 w-96" style={{ background: '#0ea5e9', animationDelay: '-11s' }} />

      {/* Falling leaves */}
      {!reduce &&
        LEAVES.map((l, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute -top-10"
            style={{ left: l.left }}
            animate={{
              y: ['0vh', '115vh'],
              x: [0, l.sway, -l.sway * 0.6, l.sway * 0.4, 0],
              rotate: [0, 140, 40, 220, 360],
            }}
            transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: 'linear' }}
          >
            <div style={{ width: l.size, height: l.size }}>
              <Leaf id={`land-leaf-${i}`} className="h-full w-full opacity-40" />
            </div>
          </motion.div>
        ))}

      <motion.div
        variants={reduce ? undefined : stagger}
        initial={reduce ? false : 'hidden'}
        animate="show"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.div variants={rise} className="relative mb-8 flex h-20 w-20 items-center justify-center">
          {/* Countdown ring — fills over AUTO_ENTER_MS, then the site enters */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r={RING_R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <circle
              cx="40"
              cy="40"
              r={RING_R}
              fill="none"
              stroke="url(#gate-ring-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C}
              style={{ animation: `gate-ring ${AUTO_ENTER_MS}ms linear forwards` }}
            />
            <defs>
              <linearGradient id="gate-ring-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="0.55" stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <Leaf id="land-mark" className="h-12 w-12 drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]" />
        </motion.div>
        <motion.p variants={rise} className="eyebrow mb-5">
          Portfolio — Data Engineer
        </motion.p>
        <motion.h1 variants={rise} className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Subhranil <span className="gradient-text">Das</span>
        </motion.h1>
        <motion.p variants={rise} className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Data platforms, CRM-scale migrations, and AI-powered analytics products.
        </motion.p>
        <motion.button
          variants={rise}
          onClick={onEnter}
          className="btn-primary group mt-12 rounded-full px-10 py-4 text-base font-medium"
        >
          Enter site
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </motion.button>
        <motion.p variants={rise} className="mt-6 font-mono text-xs text-faint">
          entering automatically — scroll, click, or press any key
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
