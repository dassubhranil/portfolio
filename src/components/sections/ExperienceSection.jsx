import { Link } from 'react-router-dom'
import Section from '../Section'
import Reveal from '../Reveal'
import { experience } from '../../data/site'

// Experience preview cards + link through to the full About story.
export default function ExperienceSection({ index = '04' }) {
  return (
    <Section id="experience" index={index} eyebrow="Experience" title="Where I’ve worked">
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
        <Link to="/background" className="mt-8 inline-block font-medium text-accent transition-colors hover:text-accent-2">
          Full story — experience, education & credentials →
        </Link>
      </Reveal>
    </Section>
  )
}
