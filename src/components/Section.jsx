import Reveal from './Reveal'

// Standard page section: numbered mono eyebrow + display heading + content.
export default function Section({ id, index, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      <Reveal>
        <p className="eyebrow mb-3">
          {index} — {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">{title}</h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-accent via-[#8b5cf6] to-accent-2" />
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}
