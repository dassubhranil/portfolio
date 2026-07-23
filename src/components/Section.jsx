import { useRef } from 'react'
import { useInView } from 'motion/react'
import Reveal from './Reveal'

// Standard page section: numbered mono eyebrow + display heading + content.
// While the section occupies the middle of the viewport, its heading lights
// up with the brand gradient and the rule under it stretches out.
export default function Section({ id, index, eyebrow, title, children, className = '' }) {
  const ref = useRef(null)
  const active = useInView(ref, { margin: '-40% 0px -50% 0px' })

  return (
    <section ref={ref} id={id} className={`mx-auto max-w-6xl px-6 py-20 md:py-24 ${className}`}>
      <Reveal>
        <p className={`eyebrow mb-3 transition-colors duration-500 ${active ? 'text-accent-2' : ''}`}>
          {index} — {eyebrow}
        </p>
        <h2
          className={`font-display text-3xl font-bold tracking-tight transition-colors duration-500 md:text-4xl ${
            active ? 'gradient-text' : 'text-ink'
          }`}
        >
          {title}
        </h2>
        <div
          className={`mt-4 h-px bg-gradient-to-r from-accent via-[#8b5cf6] to-accent-2 transition-all duration-700 ease-out ${
            active ? 'w-48' : 'w-24'
          }`}
        />
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}
