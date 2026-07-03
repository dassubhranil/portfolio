import { motion, useReducedMotion } from 'motion/react'

// Scroll-triggered fade-up reveal. Wrap any block; use `delay` for stagger.
export default function Reveal({ children, delay = 0, y = 24, className, once = true }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}
