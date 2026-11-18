import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './components/Landing'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'

// Secondary routes are split out of the initial bundle — only Home (the common
// entry, masked by the landing gate) ships eagerly; the rest load on navigation.
const About = lazy(() => import('./pages/About'))
const Work = lazy(() => import('./pages/Work'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Lightweight fallback while a split route loads — a quiet brand-tinted pulse.
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent motion-reduce:animate-none" />
    </div>
  )
}

function Page({ children }) {
  const reduce = useReducedMotion()
  return (
    <motion.main
      id="main"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()
  // Landing gate: a ~2.4s auto-dismissing brand moment, shown on every full
  // page load that arrives at the root (client-side navigation never re-opens it).
  const [showLanding, setShowLanding] = useState(() => location.pathname === '/')
  const enterSite = () => setShowLanding(false)

  // Lock page scroll while the landing gate is open
  useEffect(() => {
    document.body.style.overflow = showLanding ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [showLanding])

  // Scroll to top on route change (unless navigating to an anchor)
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  // Mouse-follow spotlight: set --mx/--my on any hovered .card (see index.css)
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.('.card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnimatePresence>{showLanding && <Landing onEnter={enterSite} />}</AnimatePresence>
      <Nav />
      <CommandPalette />
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/background" element={<Page><About /></Page>} />
            <Route path="/projects" element={<Page><Work /></Page>} />
            <Route path="/skills" element={<Page><Skills /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="/projects/:slug" element={<Page><CaseStudy /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
