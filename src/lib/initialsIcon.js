// Local text-initials fallback for tool/brand icons — no external placeholder
// service. Used wherever a vendored SVG might be missing at runtime.
export const initialsIcon = (text) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" rx="5" fill="#16161f"/><text x="10" y="14" text-anchor="middle" font-family="monospace" font-size="9" fill="#9ca3af">${text}</text></svg>`,
  )}`
