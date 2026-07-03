import { socials } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <p className="text-sm text-faint">© {new Date().getFullYear()} Subhranil Das</p>
        <div className="flex items-center gap-6 text-sm">
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-ink">
            LinkedIn
          </a>
          <a href={socials.github} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={`mailto:${socials.email}`} className="text-muted transition-colors hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
