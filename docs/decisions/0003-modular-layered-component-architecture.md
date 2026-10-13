# ADR 0003: Modular Layered Component Architecture

> **Status:** Accepted  
> **Date:** 2026-10-12  
> **Deciders:** Software Architect & Frontend Engineer

---

## 1. Context and Problem Statement

Modern React applications often degrade into "God Components" where a single JSX file handles remote HTTP requests, date arithmetic, conflict detection math, keyboard event listeners, and hundreds of lines of styled markup. This creates code that is difficult to test, impossible to reuse, and vulnerable to regressions.

With flagship features like **EduScheduler** (complex interval math) and **Smart TV Emulation** (spatial focus trees), a strict architectural separation is required.

---

## 2. Decision Drivers

* **Isolated Testability:** Business logic (algorithms, API calls, focus transitions) must be testable without mounting DOM or mocking React lifecycles.
* **Component Simplicity:** Presentation components should remain declarative, lightweight, and focused purely on rendering and accessibility.
* **Reusability:** Domain algorithms (e.g., interval collision checks) must be reusable across multiple UI views (e.g., Day View, Week View, Summary Cards).

---

## 3. Decision Outcome

We enforce a strict **3-Tier Modular Architecture**:

```
[Presentation Layer]      UI Components (*.tsx)      --> Pure rendering, Tailwind styling, ARIA
        │
[Domain Layer]            Custom Hooks (use*.ts)     --> Reactive state, lifecycles, memoized handlers
        │
[Infrastructure Layer]    Services & Clients (*.ts)  --> Pure TypeScript, zero React imports, HTTP/algorithms
```

### Architectural Mandates:
1. **Presentation Layer (`src/components/`):**
   - Must only accept typed props and invoke hooks.
   - Max file length: **150 lines**. Monolithic components must be split into sub-components.
   - Must contain **no direct API calls**, `localStorage` mutations, or complex arithmetic.
2. **Domain Layer (`src/hooks/`):**
   - Encapsulates reactive lifecycles and business state.
   - Returns strictly typed interface objects (`{ data, state, handlers }`).
   - Testable via `@testing-library/react`'s `renderHook`.
3. **Infrastructure Layer (`src/services/` & `src/utils/`):**
   - **Zero imports from React**. Pure TypeScript modules or classes.
   - Responsible for HTTP transport, cache adapters, conflict algorithms, and canvas render loops.
   - Testable in standalone Vitest/Node environments without DOM overhead.

---

## 4. Consequences

### Positive
* Clear responsibility boundaries for both human engineers and AI code assistants.
* High unit test coverage without brittle UI snapshots.
* Reusable domain logic across alternative views.

### Negative
* Requires creating three distinct files for major features (component, hook, service), introducing slight initial file proliferation.
