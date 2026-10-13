# ADR 0002: Strict TypeScript Standards & Zero `any` Policy

> **Status:** Accepted  
> **Date:** 2026-10-12  
> **Deciders:** Software Architect & Frontend Engineer

---

## 1. Context and Problem Statement

When AI coding assistants and developers produce code under rapid iterations, there is a recurring temptation to use the `any` type, type assertions (`as Type`), or suppress compiler diagnostics (`// @ts-ignore`). Over time, this erodes type safety, obscures API contracts, causes silent `undefined is not a function` runtime crashes, and degrades the architectural standard expected of a Senior Frontend Architect.

---

## 2. Decision Drivers

* **Type Safety as a Guarantee:** Compiler checks must act as an ironclad barrier against runtime errors.
* **Deterministic Code Generation:** AI agents must adhere to strict constraints that reject ambiguous or half-typed constructs.
* **Self-Documenting Codebase:** Types must convey full domain semantics (identities, states, data lifecycles).

---

## 3. Decision Outcome

We enact a **Zero Tolerance Policy for `any`** across the entire repository.

### Rules Enforced:
1. **Absolute Ban on `any`:** Neither `any` nor `as any` nor `@ts-ignore` is permitted.
2. **Mandatory Type Narrowing:** All untyped inputs (e.g., third-party JSON, browser event payloads) must be typed as `unknown` and parsed using Zod schemas or custom type guards.
3. **Discriminated Unions for Asynchronous States:** All remote data must be modeled using tagged unions (`idle | loading | success | error`), eradicating conflicting boolean state flags.
4. **Branded Types for Critical IDs:** Critical domain entities (e.g., `RoomId`, `ReservationId`) must use nominal/branded typing to avoid cross-assignment bugs.
5. **Explicit Return Types:** Exported functions, hooks, and services must explicitly document their return signatures.

---

## 4. Verification and Enforcement

* **Static Analysis:** ESLint rule `@typescript-eslint/no-explicit-any` is configured to `error`.
* **CI Quality Gate:** `tsc --noEmit` and `eslint . --max-warnings 0` are executed in pre-commit git hooks and GitHub Actions workflows. Any PR containing `any` is blocked from merging.

---

## 5. Consequences

### Positive
* Zero runtime type mismatches across domain algorithms.
* Predictable, resilient AI code generation.
* Clear, self-documenting data contracts.

### Negative
* Requires slightly more boilerplate for complex schemas and unknown inputs (mitigated by reusable Zod schemas and utility types).
