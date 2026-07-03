import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { experience, education, certifications } from '../data/site'

export default function About() {
  return (
    <div className="pt-16">
      {/* Bio */}
      <Section index="01" eyebrow="About" title="The data architect">
        <div className="grid items-start gap-12 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <img
              src="/profile_pic.jpeg"
              alt="Subhranil Das"
              className="w-full max-w-sm rounded-2xl border border-line object-cover"
            />
          </Reveal>
          <div className="prose-dark space-y-5 md:col-span-3">
            <Reveal>
              <p>
                I’m a Data Engineer with <strong>3+ years</strong> of experience building scalable, production-grade
                data systems. My work spans the full spectrum — from designing pipelines on{' '}
                <strong>Microsoft Fabric, Azure, and AWS</strong> to modeling analytical datasets in{' '}
                <strong>Snowflake</strong> and shipping the applications that sit on top of them.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                At <strong>Gruve AI</strong>, I build products, not just pipelines: a{' '}
                <strong>multi-tenant Salesforce → Dynamics 365 migration framework</strong> where entire migrations run
                from a UI, and a <strong>full-stack executive analytics platform</strong> (React + FastAPI on a Fabric
                Lakehouse) with SSO, custom RBAC, and AI capabilities — including an NL-to-SQL agent whose data access
                is permission-scoped to each user.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                I care about systems that are <strong>governed, repeatable, and self-service</strong> — the kind you
                can hand to a delivery team or an executive and trust to just work.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Experience timeline */}
      <Section index="02" eyebrow="Experience" title="Career so far">
        <div className="relative ml-2 space-y-10 border-none pl-8 md:pl-10">
          <div className="timeline-spine absolute bottom-2 left-0 top-2 w-px" />
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.06}>
              <div className="relative">
                <span className="absolute -left-[37px] top-2 h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_12px_rgba(59,130,246,0.8)] ring-4 ring-base md:-left-[45px]" />
                <article className="card rounded-2xl p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-accent">
                        {job.period} · {job.location}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-ink">{job.role}</h3>
                      <p className="mt-1 text-sm font-medium text-muted">{job.company}</p>
                    </div>
                    {job.logo && (
                      <div className={`flex h-14 min-w-14 max-w-32 shrink-0 items-center justify-center rounded-xl border border-line px-3 py-2.5 ${job.logoBg === 'light' ? 'bg-gray-100' : 'bg-elevate'}`}>
                        <img src={job.logo} alt={`${job.company} logo`} className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                  </div>
                  <ul className="prose-dark mt-5 list-disc space-y-2.5 pl-5 text-sm">
                    {job.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Education + certification */}
      <Section index="03" eyebrow="Background" title="Education & credentials">
        <div className="grid gap-5 md:grid-cols-3">
          {education.map((ed, i) => (
            <Reveal key={ed.school} delay={i * 0.08}>
              <article className="card h-full rounded-2xl p-7">
                <p className="font-mono text-xs text-accent">{ed.period}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{ed.degree}</h3>
                <p className="mt-1 text-sm text-muted">{ed.school}</p>
                <p className="mt-3 font-mono text-xs text-faint">{ed.detail}</p>
              </article>
            </Reveal>
          ))}
          {certifications.map((cert) => (
            <Reveal key={cert.credentialId} delay={0.16}>
              <article className="card h-full rounded-2xl p-7">
                <p className="font-mono text-xs text-accent">Certification</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{cert.name}</h3>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                <p className="mt-3 font-mono text-xs text-faint">
                  Issued {cert.issued} · ID {cert.credentialId}
                </p>
                <a href={cert.pdf} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-2">
                  View certificate →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  )
}
