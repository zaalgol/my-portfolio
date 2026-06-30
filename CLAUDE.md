# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for **Zalman Goldstein** (Software & ML/DL Engineer). Single-page Next.js 16 (App Router) app with a dark "enterprise-meets-edgy" aesthetic, plus an AI "Digital Twin" chat that answers career questions in his first-person voice via OpenRouter.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000 (Turbopack)
npm run build    # production build — ALSO runs the TypeScript typecheck
npm run start    # serve the production build
```

- **There is no test suite** and **ESLint is not installed** (`npm run lint` will not work as-is). `npm run build` is the de facto correctness gate — it compiles and runs `tsc`. Run it after non-trivial changes.

## Architecture

- **Single source of truth: `lib/profile.ts`.** Every piece of displayed content — bio, experience timeline, skill groups, education, certifications, portfolio cards, contact links — lives in the exported `profile` object. The UI and the chat persona both derive from it. To change site content, edit this file; do **not** hardcode profile data in components.
- **`app/page.tsx`** composes the page by stacking section components in order. **`app/layout.tsx`** sets fonts (Inter + JetBrains Mono via `next/font`), metadata (built from `profile`), and global styles.
- **`components/`** — one component per section (`Hero`, `About`, `Timeline`, `Skills`, `Portfolio`, `Contact`, `Footer`), plus chrome (`Navbar`, `ScrollProgress`, `DigitalTwin`) and a shared `Reveal`/`SectionHeading`. Section components are Client Components (`"use client"`) because they use Framer Motion.
- **Styling:** Tailwind CSS **v3** with a custom theme in `tailwind.config.ts` (the `ink`/`accent` palettes, keyframes like `gradient-pan`/`pulse-ring`, and the `glow-conic` animation). Reusable classes (`.container-x`, `.glass`, `.gradient-text`, `.section-eyebrow`, `.bg-grid`, `.bg-noise`, `.glow-conic`) are defined in `app/globals.css`. Prefer composing these over re-inventing.
- **Animation:** Framer Motion throughout — scroll-linked progress (`useScroll`/`useSpring` in `ScrollProgress` and `Timeline`), reveal-on-scroll (`Reveal`), and the rotating conic glow.

## AI Digital Twin chat

- **`app/api/chat/route.ts`** (Node runtime) is a server-side proxy to OpenRouter. The client (`components/DigitalTwin.tsx`) POSTs the message history; the route injects a persona system prompt built from `profile`, calls OpenRouter with streaming, parses the SSE, and re-emits **plain-text deltas** that the client reads incrementally.
- **Secret:** `OPENROUTER_API_KEY` lives in `.env` (gitignored) and is only ever read server-side via `process.env`. Never expose it to client code.
- **Model:** `openrouter/free` (auto-routes across all available free models — more resilient than pinning one `:free` model, which frequently 429s on the shared free tier). Requests set `reasoning: { exclude: true }`, and the route additionally runs a streaming `<think>...</think>` stripper (`makeThinkStripper`) so reasoning models never leak chain-of-thought.
- The persona prompt forbids inventing employers, dates, or technologies — keep it grounded in `profile`.

## Gotchas

- **HTTP header values must be Latin-1 (ASCII).** A non-ASCII char (e.g. an em dash `—`) in a `fetch` header value (like `X-Title`) makes `fetch` throw `Cannot convert argument to a ByteString` *before any network call* — which looks like a network failure but isn't. Keep header values ASCII.
- **Free-tier rate limits** are shared and bursty; the route returns a friendly "model is busy" message on 429. Expect occasional retries when testing.
- **Testing server-side network from inside an agent sandbox:** any dev server *spawned by the agent* (background Bash task or `Start-Process` child) is network-sandboxed and will 502 on the OpenRouter call even though the code is correct. Verify the integration with a foreground `Bash(..., dangerouslyDisableSandbox: true)` Node probe instead, and have the user run `npm run dev` in their own terminal for a real end-to-end test.
- A benign dev-only Framer Motion warning ("ensure that the container has a non-static position") can appear from the `Timeline` scroll tracking; it does not break functionality.
