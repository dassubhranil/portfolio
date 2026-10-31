import Section from '../Section'
import ProjectCard from '../ProjectCard'
import { projects } from '../../data/projects'

// Featured projects grid. Rendered both on Home and on the standalone /projects page.
export default function WorkSection({ index = '01' }) {
  return (
    <Section id="work" index={index} eyebrow="Projects" title="Featured projects">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} delay={(i % 3) * 0.08} />
        ))}
      </div>
    </Section>
  )
}
