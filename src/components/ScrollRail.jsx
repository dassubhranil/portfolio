import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import Leaf from './Leaf'

// Interactive scroll rail drawn as a winding S-curve. A leaf drifts down the
// curve as you scroll — swaying and rotating like a falling leaf. It doubles
// as a scrollbar: drag the leaf (or click/drag anywhere on the track) to
// scrub the page. Section dots sit on the curve; the active one glows and
// shows its label. Hidden below lg.

const W = 44
const H = 380
const PATH = `M 22 6 Q 42 38 22 70 T 22 134 T 22 198 T 22 262 T 22 326 T 22 374`

export default function ScrollRail({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)
  const [dots, setDots] = useState([])
  const [dragging, setDragging] = useState(false)
  const [pct, setPct] = useState(0)
  const railRef = useRef(null)
  const pathRef = useRef(null)
  const reduce = useReducedMotion()

  // Leaf position: page scroll progress → distance along the curve
  const { scrollYProgress } = useScroll()
  const eased = useSpring(scrollYProgress, { stiffness: 60, damping: 18, mass: 0.8 })
  const offsetDistance = useTransform(eased, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  // Progress % readout while dragging
  useEffect(() => scrollYProgress.on('change', (v) => setPct(Math.round(v * 100))), [scrollYProgress])

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

  // Drag / click anywhere on the rail to scrub the page scroll
  const scrubTo = (clientY) => {
    const rect = railRef.current?.getBoundingClientRect()
    if (!rect) return
    const f = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
    const doc = document.documentElement
    window.scrollTo({ top: f * (doc.scrollHeight - window.innerHeight) })
  }

  const onPointerDown = (e) => {
    setDragging(true)
    scrubTo(e.clientY)
    const onMove = (ev) => scrubTo(ev.clientY)
    const onUp = () => {
      setDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
  }

  return (
    <nav
      ref={railRef}
      className={`group/rail fixed right-4 z-40 hidden select-none lg:block ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      aria-label="Section navigation"
      style={{ width: W, height: H, top: `calc(50% - ${H / 2}px)`, touchAction: 'none' }}
      onPointerDown={onPointerDown}
    >
      {/* The winding track — brightens while hovered or dragging */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        fill="none"
        className={`absolute inset-0 transition-opacity duration-300 ${dragging ? 'opacity-100' : 'opacity-70 group-hover/rail:opacity-100'}`}
      >
        <defs>
          <linearGradient id="rail-grad" x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(59,130,246,0.6)" />
            <stop offset="0.5" stopColor="rgba(139,92,246,0.45)" />
            <stop offset="1" stopColor="rgba(34,211,238,0.35)" />
          </linearGradient>
        </defs>
        {/* Invisible fat stroke = easy hit area */}
        <path d={PATH} stroke="transparent" strokeWidth="24" />
        <path ref={pathRef} d={PATH} stroke="url(#rail-grad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" />
      </svg>

      {/* Falling-leaf indicator: follows the curve, rotating with its bends */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0"
        style={{
          offsetPath: `path("${PATH}")`,
          offsetDistance,
          offsetRotate: 'auto 90deg',
        }}
      >
        {/* Progress readout while dragging */}
        <div
          className={`absolute -left-12 top-1/2 -translate-y-1/2 rounded-md border border-accent/40 bg-base/90 px-1.5 py-0.5 font-mono text-[10px] text-accent-2 backdrop-blur-sm transition-opacity duration-200 ${
            dragging ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'rotate(-90deg) translateX(50%)' }}
        >
          {pct}%
        </div>
        <motion.div
          animate={reduce ? undefined : { rotate: [-14, 14, -14] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Leaf
            className={`drop-shadow-[0_0_8px_rgba(139,92,246,0.9)] transition-all duration-200 ${
              dragging ? 'h-7 w-7 drop-shadow-[0_0_16px_rgba(139,92,246,1)]' : 'h-5 w-5 group-hover/rail:h-6 group-hover/rail:w-6'
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Section dots on the curve */}
      {dots.map(({ id, label, x, y }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => jump(id)}
            className="group absolute flex cursor-pointer items-center"
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
