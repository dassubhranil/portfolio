import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'motion/react'
import Leaf from './Leaf'
import { resumeUrl } from '../data/site'

const links = [
  { label: 'Work', anchor: 'work' },
  { label: 'Skills', anchor: 'skills' },
  { label: 'Certifications', anchor: 'certifications' },
  { label: 'About', to: '/about' },
  { label: 'Contact', anchor: 'contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  const isHome = location.pathname === '/'

  // Scrollspy: highlight the section currently in view (home page only).
  // Sections without a nav link (e.g. experience) are still observed so the
  // previous link's highlight clears instead of going stale.
  useEffect(() => {
    if (!isHome) return
    const ids = ['intro', 'work', 'skills', 'certifications', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome, location.key])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  const goTo = (link) => {
    setOpen(false)
    if (link.to) return navigate(link.to)
    if (isHome) {
      document.getElementById(link.anchor)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    } else {
      navigate(`/#${link.anchor}`)
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-base/75 backdrop-blur-xl">
        {/* Scroll progress bar */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
          style={{ scaleX: progress }}
        />
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
            aria-label="Home"
          >
            <Leaf id="nav-leaf" className="h-5 w-5 transition-transform duration-700 ease-out group-hover:rotate-[360deg] motion-reduce:transition-none" />
            <span>
              <span className="gradient-text">S</span>ubhranil <span className="gradient-text">D</span>as
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = link.to ? location.pathname === link.to : isHome && active === link.anchor
              return (
                <button
                  key={link.label}
                  onClick={() => goTo(link)}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-accent to-accent-2"
                    />
                  )}
                </button>
              )
            })}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary ml-3 rounded-lg px-4 py-2 text-sm font-medium"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-ink" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="h-px w-6 bg-ink" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-ink" />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-base/95 px-8 backdrop-blur-xl md:hidden"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.label}
                initial={reduce ? false : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
                onClick={() => goTo(link)}
                className="py-4 text-left font-display text-3xl font-semibold text-ink"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + links.length * 0.06 }}
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary mt-6 w-fit rounded-lg px-6 py-3 font-medium"
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
