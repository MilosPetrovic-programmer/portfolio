# Product Vision & Scope

> **Document ID:** DOC-PROD-001  
> **Status:** Approved  
> **Role:** Product Strategy & Vision Specification

---

## 1. Product Vision

The primary mission of this portfolio is to serve as a **living technical dossier** that convincingly establishes the author as an elite **Senior Frontend Architect and Systems Engineer**.

Unlike typical portfolio websites that rely on superficial aesthetic templates, this application is engineered as an interactive technical artifact. It showcases the rare convergence of three distinct competencies:
1. **Modern Enterprise Web Architecture:** React 19, strict TypeScript, Tailwind CSS, modular component design, and zero-defect code quality.
2. **Full-Stack Systems Engineering:** Deep understanding of backend services, REST APIs, domain algorithms, and database concurrency (demonstrated via **EduScheduler** in PHP/MySQL & React).
3. **High-Performance Embedded Graphics:** Specialized mastery of **Smart TV & 10-foot UI development** using **LightningJS** (WebGL/Canvas 2D render trees, 60fps budgets, spatial navigation, and memory constraints).

---

## 2. Target Audience & Stakeholders

```
┌─────────────────────────────────────────────────────────────┐
│                   TARGET AUDIENCE SEGMENTS                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Engineering Directors & VP of Engineering                │
│    - Focus: Architectural maturity, standards, scalability  │
├─────────────────────────────────────────────────────────────┤
│ 2. Staff / Principal Frontend Engineers & Tech Leads        │
│    - Focus: Code elegance, strict typing, modularity        │
├─────────────────────────────────────────────────────────────┤
│ 3. Specialized Embedded / Connected TV Engineering Teams    │
│    - Focus: 10-foot UI, LightningJS, memory optimization    │
├─────────────────────────────────────────────────────────────┤
│ 4. Executive Technical Recruiters                           │
│    - Focus: Clear project impact, technology stack, metrics │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Scope of the Application

### 3.1. In-Scope Features
* **Hero & Professional Narrative:** High-impact introduction articulating core engineering capabilities and design principles.
* **Interactive Showcase 1 — EduScheduler Interactive Sandbox:**
  - Live interactive reservation calendar with drag-to-select time slots.
  - Client-side interval collision detection engine mirroring backend rules.
  - Conflict resolution flows demonstrating optimistic updates and rollback handling.
  - Architectural breakdown of the PHP REST backend and MySQL interval indexing.
* **Interactive Showcase 2 — Smart TV LightningJS Sandbox:**
  - Live 16:9 Canvas viewport emulating a connected TV application.
  - Interactive D-Pad remote control supporting arrow key and mouse navigation.
  - Performance telemetry HUD (real-time FPS, draw calls, memory allocation).
  - Deep-dive technical explanations of 10-foot UI constraints.
* **Architecture & Engineering Dossier:** Integrated reader for system ADRs, design patterns, and code standards.
* **Responsive & Accessible Design:** Flawless rendering from mobile phones to 4K desktop displays with WCAG 2.1 AA accessibility.

### 3.2. Out-of-Scope (Non-Goals)
* Generic blog CMS (content is managed statically through markdown documentation).
* Heavy, uncompressed video playback that degrades initial load performance.
* Frivolous 3D particle animations that distract from technical content or impact frame rates.

---

## 4. Key Performance Indicators (KPIs)

* **Performance:** Lighthouse score of **98+** across Performance, Accessibility, Best Practices, and SEO.
* **Frame Rate:** Consistent **60 FPS** during all animations and canvas interactions.
* **Type Strictness:** **100% strict TypeScript** with zero `any` types.
* **Bundle Size:** Initial client JavaScript payload `< 120 KB` (brotli/gzip).
