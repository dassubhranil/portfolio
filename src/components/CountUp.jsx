import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useReducedMotion, animate } from 'motion/react'

// Animated count-up that starts when scrolled into view.
export default function CountUp({ to, prefix = '', suffix = '', duration = 1.6, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const value = useMotionValue(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      if (ref.current) ref.current.textContent = `${prefix}${to}${suffix}`
      return
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, prefix, suffix, duration, reduce, value])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
