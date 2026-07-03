import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { socials } from '../data/site'

const SERVICE_ID = 'service_1mlayhg'
const TEMPLATE_ID = 'template_g2njhw7'
const PUBLIC_KEY = '3lrGHiYIW44WmcNaU'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, { publicKey: PUBLIC_KEY })
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
        {status === 'sent' && <p className="text-sm text-accent-2">Message sent — thank you! I’ll get back to you soon.</p>}
        {status === 'error' && (
          <p className="text-sm text-red-400">
            Something went wrong. Email me directly at{' '}
            <a href={`mailto:${socials.email}`} className="underline">
              {socials.email}
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
