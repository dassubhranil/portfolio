import { useRef, useState } from 'react'
import { socials } from '../data/site'

// The EmailJS SDK is pulled out of the entry chunk and loaded on demand — on
// first field focus (prefetch) and awaited again at send time. The promise is
// memoized so it only ever downloads once.
let emailjsPromise = null
const loadEmailjs = () => {
  if (!emailjsPromise) emailjsPromise = import('@emailjs/browser').then((m) => m.default)
  return emailjsPromise
}

const SERVICE_ID = 'service_1mlayhg'
const TEMPLATE_ID = 'template_g2njhw7'
const PUBLIC_KEY = '3lrGHiYIW44WmcNaU'

// Bots fill hidden fields and submit instantly; humans do neither.
const MIN_FILL_MS = 3000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validate a single field; returns an error string or '' when valid.
const validateField = (name, value) => {
  const v = value.trim()
  if (name === 'name') return v ? '' : 'Please enter your name.'
  if (name === 'email') {
    if (!v) return 'Please enter your email.'
    return EMAIL_RE.test(v) ? '' : 'Please enter a valid email address.'
  }
  if (name === 'message') {
    if (!v) return 'Please enter a message.'
    return v.length >= 10 ? '' : 'A little more detail helps — at least 10 characters.'
  }
  return ''
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})
  const openedAt = useRef(Date.now())

  const onBlur = (e) => {
    const { name, value } = e.target
    if (name === 'company') return
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  // Warm the SDK the moment someone starts filling the form, so send is instant
  const onFocus = () => loadEmailjs()

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Spam guard: honeypot filled or submitted inhumanly fast → quietly "succeed"
    if (data.get('company') || Date.now() - openedAt.current < MIN_FILL_MS) {
      setStatus('sent')
      setErrors({})
      form.reset()
      return
    }

    // Client-side validation — surface all errors at once and focus the first
    const nextErrors = {}
    for (const field of ['name', 'email', 'message']) {
      const msg = validateField(field, data.get(field) || '')
      if (msg) nextErrors[field] = msg
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      form.elements[Object.keys(nextErrors)[0]]?.focus()
      return
    }

    setErrors({})
    setStatus('sending')
    // Param names must match the EmailJS template variables (from_name / from_email / message)
    const templateParams = {
      from_name: data.get('name'),
      from_email: data.get('email'),
      message: data.get('message'),
    }
    try {
      const emailjs = await loadEmailjs()
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const fieldCls = (name) =>
    `w-full rounded-lg border bg-surface px-4 py-3 text-sm text-ink placeholder-faint outline-none transition-colors ${
      errors[name] ? 'border-red-400/70 focus:border-red-400' : 'border-line focus:border-accent/60'
    }`

  const Error = ({ name }) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-xs text-red-400">
        {errors[name]}
      </p>
    ) : null

  return (
    <form onSubmit={onSubmit} noValidate className="card rounded-2xl p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Your name"
            className={fieldCls('name')}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <Error name="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldCls('email')}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <Error name="email" />
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
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          placeholder="What would you like to talk about?"
          className={fieldCls('message')}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <Error name="message" />
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
