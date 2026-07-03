import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import ProjectCard from '../components/ProjectCard'
import SkillIcon from '../components/SkillIcon'
import ContactForm from '../components/ContactForm'
import { projects } from '../data/projects'
import { heroStats, skills, toolGroups, certifications, experience, resumeUrl } from '../data/site'

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

  // Support deep links like /#work coming from other pages
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }), 80)
  }, [hash, reduce])

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pt-16">
        <div className="hero-glow absolute inset-0" />
        <div className="dot-grid absolute inset-0" />
        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 py-24"
        >
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

        {/* Tools */}
        <div className="mt-16 space-y-10">
          {toolGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.05}>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">{group.label}</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {group.tools.map((tool) => (
                  <div key={tool.name} className="card flex flex-col items-center gap-2 rounded-xl px-3 py-4">
                    <img
                      src={tool.icon}
                      alt=""
                      loading="lazy"
                      className="h-8 w-8"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = `https://placehold.co/32x32/16161f/9ca3af?text=${encodeURIComponent(tool.fallback || tool.name.slice(0, 3))}`
                      }}
                    />
                    <span className="text-center text-xs text-muted">{tool.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Certifications ---------- */}
      <Section id="certifications" index="03" eyebrow="Credentials" title="Certifications">
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert) => (
            <Reveal key={cert.credentialId}>
              <article className="card flex flex-col gap-5 rounded-2xl p-8 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
                  <img
                    src="https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg"
                    alt="Snowflake"
                    className="h-9 w-9"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = 'https://placehold.co/36x36/16161f/9ca3af?text=SF'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-ink">{cert.name}</h3>
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                  <p className="mt-2 font-mono text-xs text-faint">
                    Issued {cert.issued} · Expires {cert.expires}
                  </p>
                  <p className="font-mono text-xs text-faint">ID {cert.credentialId}</p>
                </div>
                <a href={cert.pdf} target="_blank" rel="noreferrer" className="btn-ghost w-fit rounded-lg px-4 py-2 text-sm">
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
                <p className="font-mono text-xs text-accent">{job.period}</p>
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
            <p className="leading-relaxed text-muted">
              Whether it’s a data-platform build, a gnarly migration, or a full-stack analytics product — I’m happy to
              chat. The fastest way to reach me is this form or LinkedIn.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
