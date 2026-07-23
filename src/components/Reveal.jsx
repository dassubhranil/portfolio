import { motion, useReducedMotion } from 'motion/react'

// Scroll-triggered fade-up reveal. Wrap any block; use `delay` for stagger.
// Triggers slightly before entering the viewport so fast scrollers never see
// a blank frame waiting for the animation.
export default function Reveal({ children, delay = 0, y = 24, className, once = true }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px 120px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}
