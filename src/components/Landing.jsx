import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Leaf from './Leaf'

// Full-screen landing gate shown on first visit of a session. Floating leaves
// drift down the screen; "Enter" reveals the site with a smooth exit.
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
}
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.6, 0.35, 1] } },
}

// Deterministic pseudo-random leaf placements
const LEAVES = Array.from({ length: 9 }, (_, i) => ({
  left: `${(i * 37 + 11) % 96}%`,
  size: 14 + ((i * 13) % 18),
  duration: 11 + ((i * 7) % 9),
  delay: -((i * 3.3) % 12),
  sway: 30 + ((i * 17) % 50),
}))

export default function Landing({ onEnter }) {
  const reduce = useReducedMotion()

  // Enter key also opens the site
  useEffect(() => {
    const onKey = (e) => e.key === 'Enter' && onEnter()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
        <motion.div variants={rise} className="mb-8">
          <Leaf id="land-mark" className="h-14 w-14 drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]" />
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
          press enter ↵
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
