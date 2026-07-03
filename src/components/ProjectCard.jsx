import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import GradientBanner from './GradientBanner'

export default function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="card group flex h-full flex-col overflow-hidden rounded-2xl">
        <Link to={`/projects/${project.slug}`} className="block">
          {project.banner ? (
            <GradientBanner variant={project.banner} className="h-44 w-full" />
          ) : (
            <div className="h-44 w-full overflow-hidden bg-elevate">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.proprietary && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-accent">
                Proprietary — built at Gruve
              </span>
            )}
          </div>
          <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
            <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-elevate px-2 py-1 font-mono text-[11px] text-faint">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4 text-sm">
            <Link to={`/projects/${project.slug}`} className="font-medium text-accent transition-colors hover:text-accent-2">
              Case study →
            </Link>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-ink">
                Repo
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-ink">
                Live demo
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
