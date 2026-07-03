# Portfolio — Subhranil Das

Personal portfolio at [subhranildas.vercel.app](https://subhranildas.vercel.app).

## Stack
- Vite + React 19, React Router 7
- Tailwind CSS v4
- Framer Motion (`motion`) for animations
- EmailJS contact form, Vercel Analytics + Speed Insights

## Develop
```sh
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Content lives in `src/data/projects.js` (case studies) and `src/data/site.js` (skills, tools, experience, certifications) — edit those to update the site.

Deployed on Vercel; pushes to `main` auto-deploy. `vercel.json` handles SPA rewrites and redirects from the old static `.html` URLs.
