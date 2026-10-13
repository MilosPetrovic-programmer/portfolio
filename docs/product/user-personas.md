# User Personas & Audience Analysis

> **Document ID:** DOC-PROD-003  
> **Status:** Approved  
> **Role:** Target Audience Personas & User Journey Definitions

---

## 1. Overview

To ensure the portfolio delivers immediate impact and converts visits into high-caliber engineering opportunities, the interface and technical content are tailored around four distinct personas.

---

## 2. Core Personas

### Persona 1: Elena — Director of Frontend Engineering
* **Role:** VP or Director of Engineering at a fast-growing tech enterprise.
* **Goals:**
  - Evaluate whether the candidate can design scalable, fault-tolerant frontend architectures.
  - Assess whether the candidate enforces strict code hygiene, testing discipline, and maintainable systems.
* **Key Pain Points:**
  - Portfolios with pretty templates but messy, untyped spaghetti code under the hood.
  - Candidates who cannot articulate backend trade-offs or domain-level algorithms.
* **Portfolio Journey:**
  - Scans the Architecture Overview and ADRs.
  - Reviews the EduScheduler conflict detection and optimistic concurrency flow.
  - Checks `AGENTS.md` and `conventions.md` to see strict engineering standards.

### Persona 2: Marcus — Staff Frontend Architect & Tech Lead
* **Role:** Principal or Staff Engineer evaluating technical depth for senior roles.
* **Goals:**
  - Verify code quality: Is TypeScript truly strict? Are types clean? Is there zero `any`?
  - Examine component modularity: Are UI components separated from hooks and service clients?
* **Key Pain Points:**
  - Excessive boilerplate, untyped `any` shortcuts, and lack of automated error handling.
  - Over-reliance on third-party heavyweight libraries for trivial UI tasks.
* **Portfolio Journey:**
  - Inspects code patterns, hooks, and services in the repository.
  - Tests keyboard accessibility, focus rings, and responsiveness.
  - Evaluates custom algorithms (interval tree collision detection).

### Persona 3: Stefan — Connected TV / Embedded Systems Lead
* **Role:** Engineering Manager or Lead at an OTT streaming / Smart TV device company.
* **Goals:**
  - Identify rare talent proficient in 10-foot UI development and low-resource environments.
  - Validate understanding of LightningJS, WebGL/Canvas rendering, and remote control input.
* **Key Pain Points:**
  - Web developers who attempt to use standard DOM on low-power TV chips and cause 15 FPS stutter.
  - Lack of appreciation for texture memory pooling and garbage collection constraints.
* **Portfolio Journey:**
  - Interacts with the live browser-based Smart TV emulator using keyboard arrow keys.
  - Inspects the telemetry HUD (FPS, memory pool, draw calls).
  - Reads the Smart TV Architecture Deep-Dive.

### Persona 4: Sarah — Senior Technical Recruiter
* **Role:** Executive Technical Talent Partner specializing in Senior/Staff engineering hires.
* **Goals:**
  - Rapidly identify core technologies (React, TypeScript, Tailwind, PHP, LightningJS).
  - Extract measurable career achievements and metrics.
  - Obtain contact information and resume quickly.
* **Key Pain Points:**
  - Overly cryptic or slow-loading websites that hide key skills.
* **Portfolio Journey:**
  - Reviews Hero section and Featured Projects cards with impact metrics.
  - Downloads PDF resume or clicks direct contact links.
