# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm install
npm run dev      # Vite dev server (default http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

There is no linter, test runner, or TypeScript — the project is plain JSX. "Verifying a change" means running `npm run build` (it must succeed) and checking it in `npm run dev`.

## Architecture

A React 19 portfolio (Vite + Tailwind CSS v4 + `motion`/Framer Motion), deployed on Vercel. Pushes to `main` auto-deploy. The site is **hybrid**: `Home` is one long scroll through every section, and each of those sections *also* has its own route — the two render the **same** section component, so content is never duplicated.

**Content vs. presentation is the core split.** All site content lives in two data modules and is rendered generically by page/component code — to update what the site says, edit the data, not the JSX:
- `src/data/projects.js` — every case study (array order = display order). `getProject(slug)` looks one up. `pages/CaseStudy.jsx` renders any project from its `sections` array (each section is data-driven: `body`, `bullets`, `goals`, `images`). Body strings support `**bold**` via the in-file `Rich` component. Link fields `repo` / `demo` / `article` each render a button when present. `proprietary: true` gives the flagship card + badge and defaults its label/confidentiality copy to Gruve wording; override per-project with `proprietaryLabel` and `confidentialNote` for non-Gruve proprietary work. Proprietary projects use a `GradientBanner` `variant` (`migrate` / `dashboard` / `gateway`) instead of a screenshot `image`.
- `src/data/site.js` — hero stats, skills, tool groups, certifications, experience, education, `socials`, `resumeUrl`, `siteUrl`.

**Routing** (`src/App.jsx`, `BrowserRouter` in `main.jsx`): `/` → Home, `/projects` (Work.jsx), `/skills`, `/contact`, `/background` (About.jsx), `/projects/:slug` → CaseStudy, `*` → NotFound. `Home` is imported eagerly (it's the common entry, masked by the landing gate); every other page is **`React.lazy` + `Suspense`** (fallback `RouteFallback` spinner in `App.jsx`), so each gets its own build chunk. Each route is wrapped in a `<Page>` with an AnimatePresence enter/exit transition. `Nav` highlights the active link by `location.pathname`. SPA rewrites and legacy `.html` → route redirects live in `vercel.json` — add a redirect there if an old URL needs to keep working.

**Command palette** (`components/CommandPalette.jsx`, mounted once in `App.jsx`) is a global **⌘K / Ctrl-K** launcher: fuzzy nav to every page + case study, plus actions (copy email, resume, socials). Its command list is derived from `projects` and `site.js`, so new projects appear automatically. Open it programmatically by dispatching `new Event('cmdk:open')` on `window` (the nav search buttons do this); it also toggles on ⌘K and closes on Esc. Keyboard-driven and focus-trapped.

**Section components are the hybrid's unit of reuse.** The content sections live in `src/components/sections/` (`WorkSection`, `SkillsSection`, `ExperienceSection`, `ContactSection`), each wrapping its own `<Section id=…>` and taking an `index` prop for the numbered eyebrow. `Home` renders all of them (indexed `01`–`04`) under the inline hero; the standalone pages (`pages/Work.jsx`, etc.) each render one. `WorkSection` also takes a `filterable` prop: Home renders the plain scroll-reveal grid, while `/projects` passes `filterable` to get animated tag-filter chips (`All` + `Proprietary` + any tag shared by >1 project, derived automatically from `projects`). The single certification lives only in the Background page (`pages/About.jsx`), not as its own section. Edit a section's markup in its component and both places update. The home-only hero stays inline in `Home.jsx`.

**Per-route metadata** is set client-side by `src/hooks/usePageMeta.js` (title, description, canonical, OG/Twitter tags). The static tags in `index.html` are the no-JS crawler fallback. Set `usePageMeta` in every page component. Optional args: `image` (per-page OG/Twitter image, absolutized against `siteUrl`), `type` (`og:type`, e.g. `article`), and `jsonLd` (a structured-data object injected as a `<script>` on mount and removed on unmount, so only the current page's block is live alongside the static Person schema in `index.html`). `CaseStudy` uses all three — a BreadcrumbList + CreativeWork `@graph`, `type: 'article'`, and the project screenshot as its OG image.

**Section anchoring is shared by several pieces** and relies on matching DOM `id`s:
- `components/ScrollRail.jsx` — the fixed right-side falling-leaf rail (desktop/`lg` only, also acts as a draggable scrollbar). It's fed a `sections` array of `{ id, label }` and uses an IntersectionObserver scrollspy with `rootMargin: '-40% 0px -50% 0px'`.
- `components/Section.jsx` (Home) and the `SectionHeading` in CaseStudy use `useInView` with the **same** `-40% 0px -50% 0px` margin so the heading lights up in sync with the rail dot.

When adding or renaming a section, update together: the `<Section id>` inside its `components/sections/*` component, the `railSections` array in `pages/Home.jsx`, and (for cross-page deep links like `/#work`, still used by `Footer` and `CaseStudy`) any linking anchors. A brand-new section that should also be a route needs its own `pages/*` wrapper + a route in `App.jsx` + a `Nav` link.

**Contact form** (`components/ContactForm.jsx`) sends via EmailJS directly from the browser. The service/template/public-key IDs are inlined constants (EmailJS public keys are not secret). The EmailJS SDK is **not in the entry chunk** — it's dynamically `import()`ed via the memoized `loadEmailjs()`, prefetched on first field focus and awaited at send time. Client-side validation (`validateField`) runs on blur and on submit (name present, email format, message ≥10 chars), surfacing per-field errors with `aria-invalid`/`aria-describedby` and focusing the first invalid field; the form is `noValidate` so this messaging drives. Spam guards: a hidden `company` honeypot field and a `MIN_FILL_MS` minimum fill time — both quietly fake success rather than erroring. Template params must stay named `from_name` / `from_email` / `message`.

## Conventions

- **Design tokens** are CSS custom properties declared in `@theme` in `src/index.css` (colors `base/surface/elevate/line/ink/muted/faint/accent/accent-2`, fonts `display`/`sans`/`mono`). Reference them as Tailwind utilities (`text-muted`, `bg-surface`, `font-display`). The site is dark-theme only.
- **Reusable visual effects are CSS classes in `index.css`**, not utility soup: `.card` (with the mouse-follow spotlight — `--mx`/`--my` are set globally in `App.jsx`), `.flagship` (rotating conic border for proprietary projects), `.aurora`, `.marquee`, `.gradient-text`, `.btn-primary`/`.btn-ghost`, `.eyebrow`, `.art-frame`/`.art-window` (project-card framed screenshots), `.cover-frame`, `.prose-dark`. Prefer extending these over inventing new one-off styles.
- **Respect reduced motion.** Nearly every animation is gated on `useReducedMotion()` (JS) or a `@media (prefers-reduced-motion: reduce)` block (CSS). Match that pattern for any new motion.
- **Images carry explicit `width`/`height`** (from an `imageSize`/`size` tuple in the data) to avoid layout shift, and non-critical images use `loading="lazy"`.
- **Icons/logos are vendored into `public/icons` and `public/logos`** — no runtime third-party CDNs. Tool icons fall back to a locally-generated SVG initials badge on error (see `initialsIcon` in `src/lib/initialsIcon.js` and the `fallback` field in `toolGroups`). Add an SVG to `public/icons` and reference it by name.
- Static assets (resume, cert PDFs, OG image, `sitemap.xml`, `robots.txt`) live in `public/` and are referenced by root-absolute path (e.g. `/Subhranil_Das_Data.pdf`).
