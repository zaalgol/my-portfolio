# Zalman Goldstein — Portfolio

A stunning, "enterprise-meets-edgy" personal site built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Sections
- **Hero** — animated name, rotating roles, live status, social links
- **About** — summary + animated stat highlights
- **Career Journey** — scroll-animated alternating timeline of every role
- **Skills** — grouped tech stack, education, and certifications
- **Portfolio** — placeholder case studies, ready to fill in later
- **Contact** — email / LinkedIn / phone CTAs

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Editing your content
All profile data lives in **`lib/profile.ts`** — edit that one file to update
your bio, experience, skills, portfolio items, and links. The UI updates
automatically.

## Design notes
- Dark `#05060a` base with a cyan → teal → indigo accent gradient
- Glassmorphism cards, animated conic glow, subtle grid + noise textures
- Scroll-progress bar, reveal-on-scroll, animated timeline track
- Fully responsive with a mobile nav
