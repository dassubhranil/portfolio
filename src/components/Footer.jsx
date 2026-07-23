import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import Leaf from './Leaf'
import { socials } from '../data/site'

// Sign-off block: visitors who reach the bottom are the warmest leads —
// close with an ask, not just a copyright line.
export default function Footer() {
  const reduce = useReducedMotion()
  const backToTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="footer-glow absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-16 text-center">
        <Leaf id="footer-leaf" className="mx-auto h-9 w-9" />
        <h2 className="mt-5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Have a data problem worth <span className="gradient-text">solving</span>?
        </h2>
        <p className="mt-3 text-sm text-muted">Pipelines, migrations, analytics products — let’s talk.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/#contact" className="btn-primary rounded-lg px-6 py-3 text-sm font-medium">
            Get in touch
          </Link>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm"
          >
            <img src="/icons/linkedin.svg" alt="" width="15" height="15" className="opacity-80" />
            LinkedIn
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm"
          >
            <img src="/icons/github.svg" alt="" width="15" height="15" className="opacity-80" />
            GitHub
          </a>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Subhranil Das · Pune, India</p>
          <button onClick={backToTop} className="transition-colors hover:text-ink">
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
