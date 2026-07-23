import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import ProjectCard from '../components/ProjectCard'
import SkillIcon from '../components/SkillIcon'
import ContactForm from '../components/ContactForm'
import PipelineCard from '../components/PipelineCard'
import ScrollRail from '../components/ScrollRail'
import usePageMeta from '../hooks/usePageMeta'
import { projects } from '../data/projects'
import { heroStats, skills, toolGroups, certifications, experience, resumeUrl, socials } from '../data/site'

const allTools = toolGroups.flatMap((g) => g.tools)

// Local text-initials fallback for tool icons — no external placeholder service
const initialsIcon = (text) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" rx="5" fill="#16161f"/><text x="10" y="14" text-anchor="middle" font-family="monospace" font-size="9" fill="#9ca3af">${text}</text></svg>`,
  )}`

const railSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
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
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${socials.email}`
    }
  }
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
              View work
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
            aria-label="Scroll to work"
          >
            <span className="float-y block text-2xl text-faint transition-colors hover:text-accent">↓</span>
          </motion.button>
        </motion.div>
      </section>

      {/* ---------- Work ---------- */}
      <Section id="work" index="01" eyebrow="Work" title="Featured projects">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </Section>

      {/* ---------- Skills ---------- */}
      <Section id="skills" index="02" eyebrow="Skills" title="What I do">
        <div className="grid gap-5 md:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className={s.span === 2 ? 'md:col-span-2' : ''}>
              <article className="card h-full rounded-2xl p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                  <SkillIcon name={s.icon} />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Tools — dual infinite marquee (pauses on hover) */}
        <div className="mt-16 space-y-4">
          <Reveal>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-faint">Tools & platforms</p>
          </Reveal>
          {[allTools.slice(0, Math.ceil(allTools.length / 2)), allTools.slice(Math.ceil(allTools.length / 2))].map(
            (row, ri) => (
              <Reveal key={ri} delay={ri * 0.08}>
                <div className="marquee py-1">
                  <div className={`marquee-track ${ri === 1 ? 'reverse' : ''}`}>
                    {[...row, ...row].map((tool, ti) => (
                      <div
                        key={`${tool.name}-${ti}`}
                        className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 transition-colors hover:border-accent/50"
                      >
                        <img
                          src={tool.icon}
                          alt=""
                          loading="lazy"
                          width="20"
                          height="20"
                          className="h-5 w-5"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = initialsIcon(tool.fallback || tool.name.slice(0, 2))
                          }}
                        />
                        <span className="whitespace-nowrap text-sm text-muted">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </Section>

      {/* ---------- Certifications ---------- */}
      <Section id="certifications" index="03" eyebrow="Credentials" title="Certifications">
        <div className="space-y-5">
          {certifications.map((cert) => (
            <Reveal key={cert.credentialId}>
              {/* Full-width ribbon — reads as curated with any number of certs */}
              <article
                className="card flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
                style={{ background: 'linear-gradient(100deg, rgba(41, 181, 232, 0.08), transparent 45%), var(--color-surface)' }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent-2/25 bg-accent-2/10">
                  <img
                    src="/icons/snowflake.svg"
                    alt="Snowflake"
                    width="32"
                    height="32"
                    className="h-8 w-8"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = initialsIcon('SF')
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold text-ink">{cert.name}</h3>
                  <p className="mt-1.5 font-mono text-xs leading-relaxed text-faint">
                    {cert.issuer} · Issued {cert.issued} · Expires {cert.expires} · ID {cert.credentialId}
                  </p>
                </div>
                <a href={cert.pdf} target="_blank" rel="noreferrer" className="btn-ghost w-fit shrink-0 rounded-lg px-4 py-2 text-sm">
                  View certificate
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Experience preview ---------- */}
      <Section id="experience" index="04" eyebrow="Experience" title="Where I’ve worked">
        <div className="grid gap-5 md:grid-cols-3">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <article className="card h-full rounded-2xl p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs text-accent">{job.period}</p>
                  {job.logo && (
                    <div className={`flex h-11 min-w-11 max-w-28 shrink-0 items-center justify-center rounded-xl border border-line px-2.5 py-2 ${job.logoBg === 'light' ? 'bg-gray-100' : 'bg-elevate'}`}>
                      <img src={job.logo} alt={`${job.company} logo`} className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{job.company}</h3>
                <p className="mt-1 text-sm text-muted">{job.role}</p>
                <p className="mt-3 font-mono text-xs text-faint">{job.location}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link to="/about" className="mt-8 inline-block font-medium text-accent transition-colors hover:text-accent-2">
            Full story — experience & education →
          </Link>
        </Reveal>
      </Section>

      {/* ---------- Contact ---------- */}
      <Section id="contact" index="05" eyebrow="Contact" title="Let’s talk">
        <div className="grid items-start gap-10 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <div className="flex flex-col gap-5">
              <p className="leading-relaxed text-muted">
                Whether it’s a data-platform build, a gnarly migration, or a full-stack analytics product — I’m happy
                to chat. The fastest way to reach me is this form or LinkedIn.
              </p>
              <p className="flex items-center gap-2.5 text-sm text-muted">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" aria-hidden="true" />
                Open to interesting problems
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={copyEmail}
                  className="btn-ghost flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm"
                  aria-label={`Copy email address ${socials.email}`}
                >
                  <span className="text-ink">{socials.email}</span>
                  <span aria-live="polite" className="font-mono text-xs text-accent">
                    {copied ? 'Copied ✓' : 'Copy'}
                  </span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-ink"
                >
                  <img src="/icons/linkedin.svg" alt="" width="15" height="15" className="opacity-80" />
                  LinkedIn
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-ink"
                >
                  <img src="/icons/github.svg" alt="" width="15" height="15" className="opacity-80" />
                  GitHub
                </a>
              </div>
              <p className="font-mono text-xs text-faint">Usually replies within a day · IST (UTC+5:30)</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
