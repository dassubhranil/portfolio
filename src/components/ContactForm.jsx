import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { socials } from '../data/site'

const SERVICE_ID = 'service_1mlayhg'
const TEMPLATE_ID = 'template_g2njhw7'
const PUBLIC_KEY = '3lrGHiYIW44WmcNaU'

// Bots fill hidden fields and submit instantly; humans do neither.
const MIN_FILL_MS = 3000

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const openedAt = useRef(Date.now())

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    // Spam guard: honeypot filled or submitted inhumanly fast → quietly "succeed"
    if (data.get('company') || Date.now() - openedAt.current < MIN_FILL_MS) {
      setStatus('sent')
      e.target.reset()
      return
    }

    setStatus('sending')
    // Param names must match the EmailJS template variables (from_name / from_email / message)
    const templateParams = {
      from_name: data.get('name'),
      from_email: data.get('email'),
      message: data.get('message'),
    }
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
      setStatus('sent')
      e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink placeholder-faint outline-none transition-colors focus:border-accent/60'

  return (
    <form onSubmit={onSubmit} className="card rounded-2xl p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-muted">
            Name
          </label>
          <input id="name" name="name" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputCls} />
        </div>
      </div>
      {/* Honeypot — invisible to people, irresistible to bots */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex="-1" autoComplete="off" />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-muted">
          Message
        </label>
        <textarea id="message" name="message" required rows="5" placeholder="What would you like to talk about?" className={inputCls} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary rounded-lg px-6 py-3 text-sm font-medium disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p aria-live="polite" className="text-sm">
          {status === 'sent' && <span className="text-accent-2">Message sent — thank you! I’ll get back to you soon.</span>}
          {status === 'error' && (
            <span className="text-red-400">
              Something went wrong. Email me directly at{' '}
              <a href={`mailto:${socials.email}`} className="underline">
                {socials.email}
              </a>
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
