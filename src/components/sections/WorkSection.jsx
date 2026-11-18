import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Section from '../Section'
import ProjectCard from '../ProjectCard'
import { projects } from '../../data/projects'

// Collapse the long tag list into a short, meaningful filter set — the tags
// that span more than one project read as real themes rather than one-offs.
const filterTags = (() => {
  const counts = {}
  projects.forEach((p) => p.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)))
  return Object.keys(counts)
    .filter((t) => counts[t] > 1)
    .sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
})()

// Featured projects grid. Rendered on Home (plain grid) and on the standalone
// /projects page (with tag filtering when `filterable`).
export default function WorkSection({ index = '01', filterable = false }) {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState('All')

  const chips = ['All', 'Proprietary', ...filterTags]
  const match = (p) => (filter === 'Proprietary' ? p.proprietary : p.tags.includes(filter))
  const list = filter === 'All' ? projects : projects.filter(match)

  return (
    <Section id="work" index={index} eyebrow="Projects" title="Featured projects">
      {filterable && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by topic">
          {chips.map((tag) => {
            const isActive = filter === tag
            return (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                aria-pressed={isActive}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  isActive
                    ? 'border-accent/50 bg-accent/15 text-accent'
                    : 'border-line bg-surface text-muted hover:border-accent/40 hover:text-ink'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      )}

      {filterable ? (
        <motion.div layout={!reduce} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <ProjectCard project={p} delay={0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % 3) * 0.08} />
          ))}
        </div>
      )}

      {filterable && list.length === 0 && (
        <p className="mt-10 text-center text-sm text-faint">No projects tagged “{filter}”.</p>
      )}
    </Section>
  )
}
