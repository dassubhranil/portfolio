import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import Leaf from '../components/Leaf'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFound() {
  const reduce = useReducedMotion()
  usePageMeta({
    title: 'Page not found — Subhranil Das',
    description: 'This page drifted off. Head back to the work.',
  })

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      <div className="hero-glow absolute inset-0" />
      <div className="dot-grid absolute inset-0" />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
        className="relative flex flex-col items-center"
      >
        <Leaf id="nf-leaf" className="mb-8 h-12 w-12 opacity-80" />
        <p className="eyebrow mb-4">404 — Lost leaf</p>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          This page drifted <span className="gradient-text">off</span>.
        </h1>
        <p className="mt-5 max-w-md text-muted">
          The link may be old or mistyped — everything worth seeing is one hop away.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary rounded-lg px-6 py-3 text-sm font-medium">
            Back home
          </Link>
          <Link to="/#work" className="btn-ghost rounded-lg px-6 py-3 text-sm font-medium">
            View work
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
