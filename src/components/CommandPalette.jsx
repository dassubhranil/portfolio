import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { projects } from '../data/projects'
import { socials, resumeUrl } from '../data/site'

// Global ⌘K / Ctrl-K command palette: quick navigation to every page and case
// study, plus the common actions (copy email, open socials, grab the resume).
// Fully keyboard-driven, focus-trapped, and announced to screen readers.
export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const lastFocused = useRef(null)
  const navigate = useNavigate()
  const reduce = useReducedMotion()

  // All available commands, grouped. `run` returns true to keep the palette
  // open (e.g. copy email shows feedback) or falsy to close it.
  const commands = useMemo(() => {
    const go = (to) => () => navigate(to)
    return [
      { group: 'Navigate', label: 'Home', hint: 'Overview', keywords: 'intro start', run: go('/') },
      { group: 'Navigate', label: 'Projects', hint: 'Case studies', keywords: 'work portfolio', run: go('/projects') },
      { group: 'Navigate', label: 'Skills', hint: 'What I do', keywords: 'tools stack', run: go('/skills') },
      { group: 'Navigate', label: 'Background', hint: 'Experience & education', keywords: 'about career resume bio', run: go('/background') },
      { group: 'Navigate', label: 'Contact', hint: 'Get in touch', keywords: 'email message hire', run: go('/contact') },
      ...projects.map((p) => ({
        group: 'Case studies',
        label: p.title,
        hint: p.tags.slice(0, 2).join(' · '),
        keywords: `${p.tags.join(' ')} ${p.blurb}`,
        run: go(`/projects/${p.slug}`),
      })),
      {
        group: 'Actions',
        label: 'Copy email address',
        hint: socials.email,
        keywords: 'mail contact',
        run: async () => {
          try {
            await navigator.clipboard.writeText(socials.email)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
          } catch {
            window.location.href = `mailto:${socials.email}`
          }
          return true // keep open to show the "copied" state
        },
      },
      { group: 'Actions', label: 'Download resume', hint: 'PDF', keywords: 'cv pdf', run: () => window.open(resumeUrl, '_blank', 'noopener') },
      { group: 'Actions', label: 'Open GitHub', hint: 'github.com', keywords: 'code repo', run: () => window.open(socials.github, '_blank', 'noopener') },
      { group: 'Actions', label: 'Open LinkedIn', hint: 'linkedin.com', keywords: 'social connect', run: () => window.open(socials.linkedin, '_blank', 'noopener') },
    ]
  }, [navigate])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.hint} ${c.keywords}`.toLowerCase().includes(q))
  }, [commands, query])

  // Open / close via keyboard anywhere on the site
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('cmdk:open', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('cmdk:open', onOpen)
    }
  }, [])

  // Manage focus + scroll lock while open; restore focus on close
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement
      setQuery('')
      setActive(0)
      document.body.style.overflow = 'hidden'
      // focus after paint so the animation doesn't swallow it
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      lastFocused.current?.focus?.()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keep the active index in range when the result set shrinks
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, results.length - 1)))
  }, [results.length])

  const choose = async (cmd) => {
    if (!cmd) return
    const keepOpen = await cmd.run()
    if (!keepOpen) setOpen(false)
  }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % Math.max(1, results.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + results.length) % Math.max(1, results.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(results[active])
    }
  }

  // Scroll the active row into view as it changes
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  // Group results for display while keeping a flat index for keyboard nav
  let flatIdx = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-base/70 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.21, 0.6, 0.35, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-faint" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKey}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={results[active] ? `cmdk-opt-${active}` : undefined}
                placeholder="Search pages, projects, actions…"
                className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder-faint"
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">esc</kbd>
            </div>

            <ul ref={listRef} id="cmdk-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2" aria-label="Commands">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-faint">No matches for “{query}”.</li>
              )}
              {results.map((cmd, i, arr) => {
                flatIdx += 1
                const idx = flatIdx
                const isActive = idx === active
                const showGroup = i === 0 || arr[i - 1].group !== cmd.group
                const isCopy = cmd.label === 'Copy email address'
                return (
                  <li key={`${cmd.group}-${cmd.label}`}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{cmd.group}</p>
                    )}
                    <button
                      id={`cmdk-opt-${idx}`}
                      data-idx={idx}
                      role="option"
                      aria-selected={isActive}
                      onMouseMove={() => setActive(idx)}
                      onClick={() => choose(cmd)}
                      className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isActive ? 'bg-accent/15 text-ink' : 'text-muted hover:bg-elevate'
                      }`}
                    >
                      <span className="truncate text-sm font-medium">{cmd.label}</span>
                      <span className="shrink-0 truncate font-mono text-[11px] text-faint">
                        {isCopy && copied ? 'Copied ✓' : cmd.hint}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
              <span><kbd className="text-muted">↑↓</kbd> navigate</span>
              <span><kbd className="text-muted">↵</kbd> select</span>
              <span className="ml-auto"><kbd className="text-muted">⌘K</kbd> toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
