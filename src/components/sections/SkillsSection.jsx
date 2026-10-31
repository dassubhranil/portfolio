import Section from '../Section'
import Reveal from '../Reveal'
import SkillIcon from '../SkillIcon'
import { initialsIcon } from '../../lib/initialsIcon'
import { skills, toolGroups } from '../../data/site'

const allTools = toolGroups.flatMap((g) => g.tools)

// "What I do" bento + the dual infinite tools marquee. Rendered on Home and /skills.
export default function SkillsSection({ index = '02' }) {
  return (
    <Section id="skills" index={index} eyebrow="Skills" title="What I do">
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
  )
}
