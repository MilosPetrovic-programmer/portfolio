# Senior Frontend Architect & Systems Engineer Portfolio

[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict_v5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-v19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Code Standards](https://img.shields.io/badge/Quality-Zero_`any`_Enforced-brightgreen)](./AGENTS.md)

---

## 1. Overview & Vision

Welcome to the production repository for my professional portfolio and technical showcase. Designed and engineered from first principles, this project is built not just as a static showcase, but as an interactive, production-grade web application demonstrating senior-level frontend engineering, systems architecture, and high-performance user interface development.

### Core Engineering Focus
* **Modern Scalable Web Applications:** React 19, strict TypeScript, Tailwind CSS, modular component design, TanStack Query, and reactive client state.
* **Full-Stack Systems & API Architecture:** Robust PHP backend engineering (clean MVC, PSR-12, REST API design, domain-driven scheduling algorithms) demonstrated through the flagship **EduScheduler** platform.
* **Embedded & 10-Foot UI Engineering:** High-performance **Smart TV development** using **LightningJS** (WebGL/Canvas 2D rendering, sustained 60fps frame budgets, spatial D-pad navigation, and rigorous memory/texture management on low-spec hardware).

---

## 2. Key Showcase Highlights

### 🎓 1. EduScheduler (Classroom & Resource Reservation Engine)
* **Stack:** React, TypeScript, PHP (REST API), Tailwind CSS, MySQL.
* **Problem:** Large educational institutions suffer from complex room scheduling conflicts, overlapping professor allocations, recurring semester timetables, and multi-tier booking approvals.
* **Architectural Solution:**
  * Interactive React scheduling grid with millisecond-level interval conflict detection.
  * Optimistic UI updates with instant rollback on concurrent booking collision (HTTP 409).
  * Comprehensive Role-Based Access Control (RBAC): Student, Professor, Facility Admin.
  * Robust PHP backend services implementing interval tree search algorithms for high-speed clash detection.

### 📺 2. Smart TV & Connected Device Engine (LightningJS)
* **Stack:** LightningJS (Canvas 2D / WebGL), TypeScript, Spatial Navigation Engine.
* **Problem:** Developing responsive, stutter-free 10-foot user experiences on low-power connected TVs (e.g., Comcast X1, Samsung Tizen, LG webOS) where the standard DOM incurs severe performance penalties.
* **Architectural Solution:**
  * Bypasses the HTML DOM by rendering UI trees directly onto an accelerated WebGL/Canvas surface.
  * Deterministic D-Pad spatial focus engine handling 6-way input states (Up, Down, Left, Right, Enter, Back).
  * Strict memory management: Active texture lifecycle disposal, off-screen node recycling, and zero garbage collection spikes during high-speed carousel scrolling.
  * In-portfolio interactive emulator: Allows browser visitors to experience LightningJS UI with their keyboard arrow keys or an on-screen TV remote control.

---

## 3. Technology Stack

| Layer | Technology | Purpose & Rationale |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture, transitions, and concurrent rendering features. |
| **Language** | [TypeScript 5.x](https://www.typescriptlang.org/) | Strict mode, zero `any` tolerance, branded types, and full type safety. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first, semantic design token system, zero runtime CSS overhead. |
| **Tooling & Build** | [Vite](https://vitejs.dev/) | Sub-second HMR, optimized Rollup-based production builds, tree-shaking. |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query) | Separation of local client state vs server cache with optimistic synchronization. |
| **Validation** | [Zod](https://zod.dev/) | Runtime contract validation for API schemas and form states. |
| **Testing** | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) | High-speed unit and integration test suite with DOM mocking. |
| **Code Quality** | ESLint + Prettier + Husky | Automated pre-commit linting and git hooks enforcing formatting rules. |

---

## 4. Architecture & Directory Structure

This project enforces a clean, modular 3-tier architectural separation across presentation, domain logic, and infrastructure:

```
portfolio/
├── AGENTS.md                  # Strict AI agent operating manual and guardrails
├── README.md                  # Root project documentation
├── docs/                      # Architectural and system documentation suite
│   ├── architecture/          # High-level architecture, component & state designs
│   │   ├── overview.md
│   │   ├── component-design.md
│   │   ├── state-management.md
│   │   └── showcase-architecture.md
│   ├── decisions/             # Architecture Decision Records (ADRs)
│   │   ├── 0001-tech-stack-selection.md
│   │   ├── 0002-strict-typescript-and-zero-any-policy.md
│   │   ├── 0003-modular-layered-component-architecture.md
│   │   └── 0004-smart-tv-interactive-demo-sandbox.md
│   ├── machine-learning/      # AI features & intelligent career assistant specs
│   │   └── ai-integrations.md
│   ├── plans/                 # Roadmaps and production release checklists
│   │   ├── roadmap.md
│   │   └── release-checklist.md
│   ├── product/               # Vision, user personas, and project specs
│   │   ├── vision-and-scope.md
│   │   ├── featured-projects.md
│   │   └── user-personas.md
│   └── system/                # Conventions, testing, performance, CI/CD
│       ├── conventions.md     # Mandatory code style & architectural guardrails
│       ├── performance-and-security.md
│       ├── testing-strategy.md
│       └── ci-cd.md
├── src/                       # Application source code (following 3-tier separation)
│   ├── assets/                # Static assets, SVGs, and brand images
│   ├── components/            # Pure UI components (Atoms, Molecules, Organisms)
│   │   ├── common/            # Reusable buttons, modals, cards, badges
│   │   ├── layout/            # Navbar, footer, page shell, grid containers
│   │   ├── showcase/          # EduScheduler and LightningJS interactive widgets
│   │   └── tv-emulator/       # Canvas renderer and TV remote control UI
│   ├── hooks/                 # Custom React hooks (Domain logic & orchestration)
│   ├── services/              # API clients, local storage, external adapters
│   ├── types/                 # Shared TypeScript interfaces, types, and unions
│   ├── styles/                # Global styles, Tailwind directives, font configurations
│   ├── utils/                 # Pure helper functions, formatting, validation
│   ├── App.tsx                # Application root with router and providers
│   └── main.tsx               # Application entry point
├── public/                    # Uncompiled static assets
├── index.html                 # HTML shell
├── package.json               # Dependencies and scripts
├── tsconfig.json              # Strict TypeScript compiler options
├── tailwind.config.ts         # Tailwind design system configuration
└── vite.config.ts             # Vite build and plugin configuration
```

---

## 5. Development Workflow & Commands

### Prerequisites
* **Node.js:** `>= 20.x LTS`
* **npm:** `>= 10.x`

### Installation
```bash
npm install
```

### Local Development Server
```bash
npm run dev
```
Starts the Vite development server with Hot Module Replacement (HMR) at `http://localhost:5173`.

### Code Quality & Verification Suite
All four verification commands must pass with zero errors prior to finalizing any task or pushing commits:

```bash
# 1. Strict TypeScript check (no emit)
npm run typecheck

# 2. ESLint verification (zero warnings allowed)
npm run lint

# 3. Vitest test suite execution
npm run test

# 4. Production build test
npm run build
```

---

## 6. Engineering Documentation Index

Detailed architectural blueprints, design decisions, and system conventions are documented within the [`docs/`](./docs) directory:

* 📐 **[Architecture Overview](./docs/architecture/overview.md)** — Architectural layers, client rendering model, and component topology.
* 🧩 **[Component Design](./docs/architecture/component-design.md)** — Component separation, compound components, and accessibility.
* 🔄 **[State Management](./docs/architecture/state-management.md)** — Strategy for server state vs client state.
* 🏛️ **[Showcase Deep-Dives](./docs/architecture/showcase-architecture.md)** — Deep technical architectures of EduScheduler and LightningJS TV apps.
* 📜 **[Architecture Decision Records (ADRs)](./docs/decisions/)** — Historical record of architectural trade-offs.
* 🤖 **[AI Agent Operating Manual](./AGENTS.md)** — Rules and guardrails for automated coding assistants.
* 📏 **[System Conventions & Standards](./docs/system/conventions.md)** — Coding conventions, typing rules, naming patterns, and commit guidelines.
* ⚡ **[Performance & Security](./docs/system/performance-and-security.md)** — 60fps budgets, memory management, and CSP rules.
* 🧪 **[Testing Strategy](./docs/system/testing-strategy.md)** — Unit, integration, and E2E testing paradigms.
* 🚀 **[CI/CD Pipeline](./docs/system/ci-cd.md)** — Automated verification, quality gates, and deployment.

---

## 7. License & Attribution

Designed and engineered with strict software engineering discipline.  
© 2026. All rights reserved.
