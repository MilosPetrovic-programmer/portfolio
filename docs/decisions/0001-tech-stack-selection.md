# ADR 0001: Core Technology Stack Selection

> **Status:** Accepted  
> **Date:** 2026-10-12  
> **Deciders:** Software Architect & Frontend Engineer

---

## 1. Context and Problem Statement

A portfolio representing a Senior Frontend Architect must satisfy two stringent criteria:
1. Provide instant loading performance, fluid 60fps animations, rock-solid accessibility, and responsive typography across all devices.
2. Directly demonstrate the technical depth of modern web application development, typed systems, and architectural discipline.

We must select a core technology stack that balances developer ergonomics, ecosystem maturity, performance, and type safety without introducing unnecessary bloat.

---

## 2. Decision Drivers

* **Type Safety:** Strict, non-negotiable TypeScript support across all layers.
* **Build Speed & Developer Experience:** Instant Hot Module Replacement (HMR) and optimized tree-shaking for production assets.
* **Component Modularity:** Declarative UI composition capable of supporting interactive micro-apps (EduScheduler and Smart TV emulator).
* **Styling Ergonomics:** Zero runtime CSS overhead, strict design token system, responsive utility primitives.
* **Maintainability & Longevity:** Standardized tools supported by strong community ecosystems.

---

## 3. Considered Options

1. **Option A:** Next.js (App Router / SSR) + TypeScript + Tailwind CSS.
2. **Option B:** Single-Page Application (SPA) with Vite + React 19 + TypeScript + Tailwind CSS.
3. **Option C:** Astro + React Islands + Tailwind CSS.

---

## 4. Decision Outcome

**Chosen Option: Option B — Vite + React 19 + TypeScript + Tailwind CSS.**

### Justification:
* **Vite:** Delivers sub-second cold starts, native ESM in development, and lean Rollup production builds. For a client-side interactive showcase containing canvas rendering loops and spatial navigation emulators, an optimized SPA eliminates SSR hydration mismatches while simplifying static edge hosting (Cloudflare Pages, Vercel, Netlify, or GitHub Pages).
* **React 19:** Introduces the React Compiler model, streamlined transitions, and robust concurrent capabilities, representing the industry benchmark for modern enterprise web UI.
* **TypeScript 5.x:** Configured with maximum compiler strictness (`strict: true`, `noImplicitAny: true`, `noUncheckedIndexedAccess: true`), enforcing high code quality.
* **Tailwind CSS:** Generates an ultra-lean CSS footprint (~10-15 KB purged) with zero runtime cost, allowing full design token control and rapid theme customization.

---

## 5. Pros and Cons of the Selected Option

### Pros
* **Zero Hydration Latency:** The application boots instantly as an interactive SPA; no hydration overhead for canvas and dynamic schedulers.
* **Static Deployment:** Can be hosted on any high-availability global CDN edge with zero server maintenance.
* **Isolated State:** Client-side stores (Zustand) and query caches operate without complex server-client state transfer synchronization.

### Cons
* **Initial SEO:** Pure SPA requires prerendering or static metadata tags for social media previews (addressed via Vite HTML prerendering plugins and Open Graph tags in `index.html`).
