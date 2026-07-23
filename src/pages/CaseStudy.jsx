import { Link, useParams } from 'react-router-dom'
import { useRef } from 'react'
import { useInView } from 'motion/react'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import GradientBanner from '../components/GradientBanner'
import ScrollRail from '../components/ScrollRail'
import usePageMeta from '../hooks/usePageMeta'
import NotFound from './NotFound'
import { projects, getProject } from '../data/projects'

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Case-study section heading that lights up while its section is in view
function SectionHeading({ index, children }) {
  const ref = useRef(null)
  const active = useInView(ref, { margin: '-40% 0px -50% 0px' })
  return (
    <div ref={ref}>
      <p className={`eyebrow mb-2 transition-colors duration-500 ${active ? 'text-accent-2' : ''}`}>{index}</p>
      <h2
        className={`font-display text-2xl font-bold tracking-tight transition-colors duration-500 md:text-3xl ${
          active ? 'gradient-text' : 'text-ink'
        }`}
      >
        {children}
      </h2>
    </div>
  )
}

// Render **bold** spans inside data-driven copy.
function Rich({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  usePageMeta({
    title: project ? `${project.title} — Subhranil Das` : 'Page not found — Subhranil Das',
    description: project?.blurb,
  })
  if (!project) return <NotFound />

  const idx = projects.indexOf(project)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  const railSections = [
    { id: 'cs-top', label: 'Overview' },
    ...project.sections.slice(1).map((s) => ({ id: `cs-${slugify(s.heading)}`, label: s.heading })),
  ]

  return (
    <div className="pt-16">
      <ScrollRail sections={railSections} />
      {/* Hero */}
      <section id="cs-top" className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="aurora right-[10%] top-[5%] h-64 w-80" style={{ background: '#8b5cf6' }} />
        <div className="aurora left-[5%] top-[30%] h-56 w-64" style={{ background: '#3b82f6', animationDelay: '-8s' }} />
        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-20">
          <Reveal>
            <nav className="font-mono text-xs text-faint">
              <Link to="/" className="transition-colors hover:text-ink">
                Home
              </Link>
              {' / '}
              <Link to="/#work" className="transition-colors hover:text-ink">
                Work
              </Link>
              {' / '}
              <span className="text-muted">{project.title}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.proprietary && (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs tracking-wide text-accent">
                  Proprietary — built at Gruve
                </span>
              )}
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-elevate px-2.5 py-1 font-mono text-xs text-faint">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.blurb}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" className="btn-primary rounded-lg px-5 py-2.5 text-sm font-medium">
                  View repository
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn-ghost rounded-lg px-5 py-2.5 text-sm font-medium">
                  Live demo
                </a>
              )}
            </div>
          </Reveal>

          {/* KPI row */}
          <Reveal delay={0.18}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {project.kpis.map((kpi) => (
                <div key={kpi.label} className="card rounded-2xl p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-faint">{kpi.label}</p>
                  <p className="mt-2 font-display text-xl font-bold text-ink">
                    {kpi.countTo != null ? (
                      <CountUp to={kpi.countTo} prefix={kpi.prefix || ''} suffix={kpi.suffix || ''} />
                    ) : (
                      kpi.value
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Banner / cover */}
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          {project.banner ? (
            <GradientBanner variant={project.banner} className="h-56 w-full rounded-2xl border border-line md:h-72" />
          ) : project.coverFrame ? (
            <div className="cover-frame w-full rounded-2xl border border-line">
              <div className="dot-grid absolute inset-0" />
              <div className="art-window">
                <div className="art-window-bar" aria-hidden="true">
                  <i /><i /><i />
                </div>
                <div className="art-window-shot">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={project.imageSize?.[0]}
                    height={project.imageSize?.[1]}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            project.image && (
              <img
                src={project.image}
                alt={project.title}
                width={project.imageSize?.[0]}
                height={project.imageSize?.[1]}
                className="max-h-[420px] w-full rounded-2xl border border-line object-cover"
              />
            )
          )}
        </Reveal>
      </div>

      {/* Body sections */}
      <div className="mx-auto max-w-4xl space-y-16 px-6 py-20">
        {project.sections.map((section, si) => (
          <Reveal key={section.heading}>
            <section id={`cs-${slugify(section.heading)}`}>
              <SectionHeading index={String(si + 1).padStart(2, '0')}>{section.heading}</SectionHeading>
              <div className="prose-dark mt-6 space-y-4">
                {section.body?.map((p, pi) => (
                  <p key={pi}>
                    <Rich text={p} />
                  </p>
                ))}
                {section.goals && (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.goals.map((g, gi) => (
                      <li key={gi}>
                        <Rich text={g} />
                      </li>
                    ))}
                  </ul>
                )}
                {section.bullets && (
                  <ul className="space-y-3">
                    {section.bullets.map((b, bi) => (
                      <li key={bi} className="card flex gap-3 rounded-xl p-4 text-sm">
                        <span className="mt-0.5 shrink-0 text-accent">▸</span>
                        <span>
                          <Rich text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.images && (
                  <div className="grid gap-4 pt-2 sm:grid-cols-2">
                    {section.images.map((img) => (
                      <figure key={img.src}>
                        <img
                          src={img.src}
                          alt={img.caption}
                          loading="lazy"
                          width={img.size?.[0]}
                          height={img.size?.[1]}
                          className="w-full rounded-xl border border-line"
                        />
                        <figcaption className="mt-2 text-center font-mono text-xs text-faint">{img.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </Reveal>
        ))}

        {project.confidential && (
          <Reveal>
            <div className="card rounded-2xl border-accent/20 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">Confidentiality</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                This product was built for Gruve and its clients. Source code, screenshots, and client-specific details
                are proprietary — this case study describes the architecture and capabilities at a general level.
              </p>
            </div>
          </Reveal>
        )}

        {/* Prev / next */}
        <Reveal>
          <div className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            <Link to={`/projects/${prev.slug}`} className="card group rounded-2xl p-6">
              <p className="font-mono text-xs text-faint">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none">←</span>{' '}
                Previous
              </p>
              <p className="mt-2 font-display font-semibold text-ink transition-colors group-hover:text-accent">
                {prev.title}
              </p>
            </Link>
            <Link to={`/projects/${next.slug}`} className="card group rounded-2xl p-6 text-right">
              <p className="font-mono text-xs text-faint">
                Next{' '}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">→</span>
              </p>
              <p className="mt-2 font-display font-semibold text-ink transition-colors group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
