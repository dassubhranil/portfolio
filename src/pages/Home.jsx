import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import CountUp from '../components/CountUp'
import PipelineCard from '../components/PipelineCard'
import ScrollRail from '../components/ScrollRail'
import WorkSection from '../components/sections/WorkSection'
import SkillsSection from '../components/sections/SkillsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import ContactSection from '../components/sections/ContactSection'
import usePageMeta from '../hooks/usePageMeta'
import { heroStats, resumeUrl, socials } from '../data/site'

const railSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] } },
}

export default function Home() {
  const reduce = useReducedMotion()
  const { hash } = useLocation()

  usePageMeta({
    title: 'Subhranil Das — Data Engineer',
    description:
      'Subhranil Das — Data Engineer building data platforms and full-stack analytics products on Microsoft Fabric, Snowflake, and Azure.',
  })

  // Support deep links like /#work coming from other pages
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }), 80)
  }, [hash, reduce])

  return (
    <>
      <ScrollRail sections={railSections} />

      {/* ---------- Hero ---------- */}
      <section id="intro" className="relative overflow-hidden pt-16">
        <div className="hero-glow absolute inset-0" />
        <div className="dot-grid absolute inset-0" />
        {/* Aurora color fields */}
        <div className="aurora left-[8%] top-[12%] h-72 w-72" style={{ background: '#3b82f6' }} />
        <div className="aurora right-[12%] top-[8%] h-80 w-96" style={{ background: '#8b5cf6', animationDelay: '-6s' }} />
        <div className="aurora bottom-[15%] left-[35%] h-64 w-80" style={{ background: '#0ea5e9', animationDelay: '-11s' }} />
        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="relative mx-auto grid min-h-[92vh] max-w-6xl content-center items-center gap-12 px-6 py-24 lg:grid-cols-[1.15fr_1fr]"
        >
          <div>
          <motion.p variants={rise} className="eyebrow mb-5">
            Data Engineer · Pune, India
          </motion.p>
          <motion.h1 variants={rise} className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Subhranil <span className="gradient-text">Das</span>
          </motion.h1>
          <motion.p variants={rise} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            I build data platforms and full-stack analytics products — Microsoft Fabric, Snowflake, and Azure. From
            CRM-scale migrations to AI-powered executive dashboards.
          </motion.p>
          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}
              className="btn-primary rounded-lg px-6 py-3 text-sm font-medium"
            >
              View projects
            </button>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost rounded-lg px-6 py-3 text-sm font-medium">
              Download resume
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="btn-ghost flex h-11 w-11 items-center justify-center rounded-lg"
            >
              <img src="/icons/github.svg" alt="" width="18" height="18" className="opacity-80" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="btn-ghost flex h-11 w-11 items-center justify-center rounded-lg"
            >
              <img src="/icons/linkedin.svg" alt="" width="18" height="18" className="opacity-80" />
            </a>
          </motion.div>
          <motion.div variants={rise} className="mt-16 grid max-w-lg grid-cols-3 gap-8 border-t border-line pt-8">
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-ink">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-faint">{s.label}</p>
              </div>
            ))}
          </motion.div>
          </div>
          {/* Live pipeline card — the hero's right-hand anchor (desktop only) */}
          <motion.div variants={rise} className="hidden lg:block">
            <PipelineCard />
          </motion.div>
          {/* Scroll hint */}
          <motion.button
            variants={rise}
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
            aria-label="Scroll to projects"
          >
            <span className="float-y block text-2xl text-faint transition-colors hover:text-accent">↓</span>
          </motion.button>
        </motion.div>
      </section>

      <WorkSection index="01" />
      <SkillsSection index="02" />
      <ExperienceSection index="03" />
      <ContactSection index="04" />
    </>
  )
}
