import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './components/Landing'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'

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
  // Landing gate: shown once per browser session, only when arriving at the
  // root. Reduced-motion users skip it entirely — it's a motion moment.
  const [showLanding, setShowLanding] = useState(
    () =>
      location.pathname === '/' &&
      !sessionStorage.getItem('entered') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const enterSite = () => {
    sessionStorage.setItem('entered', '1')
    setShowLanding(false)
  }

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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/projects/:slug" element={<Page><CaseStudy /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
