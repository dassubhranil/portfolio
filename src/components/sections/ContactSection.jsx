import { useState } from 'react'
import Section from '../Section'
import Reveal from '../Reveal'
import ContactForm from '../ContactForm'
import { socials } from '../../data/site'

// Contact copy + form. Rendered on Home and on the standalone /contact page.
export default function ContactSection({ index = '05' }) {
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

  return (
    <Section id="contact" index={index} eyebrow="Contact" title="Let’s talk">
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
  )
}
