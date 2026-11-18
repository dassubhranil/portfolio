import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteUrl } from '../data/site'

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const absolute = (path) => (path?.startsWith('http') ? path : `${siteUrl}${path || ''}`)

// Per-route document metadata: title, description, canonical, the social tags
// that JS-aware crawlers (Google) read, and optional per-page structured data.
// The static tags in index.html remain the fallback for crawlers that don't
// execute JS. `image` overrides the default OG image; `jsonLd` injects a page
// JSON-LD block that is cleaned up on unmount so only one page's data is live.
export default function usePageMeta({ title, description, image, type = 'website', jsonLd }) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title
    const url = `${siteUrl}${pathname === '/' ? '/' : pathname}`

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
    setMeta('property', 'og:title', title)
    setMeta('name', 'twitter:title', title)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)

    if (image) {
      const abs = absolute(image)
      setMeta('property', 'og:image', abs)
      setMeta('name', 'twitter:image', abs)
    }

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, image, type, pathname])

  // Per-page JSON-LD (breadcrumbs, CreativeWork, …) — injected on mount,
  // removed on unmount so the static Person schema in index.html stays the
  // only persistent block.
  useEffect(() => {
    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-page-jsonld', '')
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => script.remove()
  }, [jsonLd])
}
