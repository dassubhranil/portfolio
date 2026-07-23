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

// Per-route document metadata: title, description, canonical, and the social
// tags that JS-aware crawlers (Google) read. The static tags in index.html
// remain the fallback for crawlers that don't execute JS.
export default function usePageMeta({ title, description }) {
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

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, pathname])
}
