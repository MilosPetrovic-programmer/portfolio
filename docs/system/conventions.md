# System Conventions & Engineering Standards

> **Document ID:** DOC-SYS-001  
> **Status:** Active & Enforced  
> **Applicability:** All frontend code, components, hooks, services, test suites, and documentation.

---

## 1. Introduction & Core Philosophy

This document defines the official engineering conventions, code architecture, and quality standards for the portfolio application and its interactive technical showcases (including **EduScheduler** and the **Smart TV LightningJS Emulator**).

Every contributor and AI agent must adhere to three foundational pillars:
1. **Predictability:** Code must behave deterministically, with all states (loading, empty, error, success) explicitly modeled and typed.
2. **Modularity:** Strict separation of presentation, domain logic, and infrastructure ensures isolated testability and zero spaghetti dependencies.
3. **Maintainability:** Code is written for human clarity first and machine execution second. Self-documenting naming, zero hacks, and no untyped shortcuts.

---

## 2. Strict TypeScript Standards

The TypeScript compiler is configured with maximum strictness (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`, `noUncheckedIndexedAccess: true`).

### 2.1. The Zero `any` Policy
* **Prohibition:** The `any` keyword is **strictly banned** throughout the entire codebase.
* **Review Failure:** Pull requests or AI suggestions containing `any`, `as any`, or `// @ts-ignore` will be automatically rejected.
* **Working with Dynamic/Unknown Data:** Use `unknown` combined with type guards or runtime validation (Zod):

```typescript
// ❌ REJECTED: Unsafe and untyped
export function parseApiPayload(raw: any): any {
  return raw.data;
}

// ✅ APPROVED: Strict unknown with Zod runtime validation
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['STUDENT', 'PROFESSOR', 'ADMIN']),
});

export type User = z.infer<typeof UserSchema>;

export function parseApiPayload(raw: unknown): User {
  return UserSchema.parse(raw);
}
```

### 2.2. Discriminated Unions for State Modeling
Never use fragmented or conflicting boolean flags (e.g., `isLoading`, `isError`, `isSuccess`) to represent asynchronous lifecycles. Always use discriminated unions:

```typescript
// ❌ REJECTED: Invalid states possible (e.g., isLoading=true AND isError=true)
interface BadState<T> {
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  data?: T;
}

// ✅ APPROVED: Mutually exclusive, impossible-state-free modeling
export type RemoteData<T, E = Error> =
  | { readonly status: 'idle'; readonly data: null; readonly error: null }
  | { readonly status: 'loading'; readonly data: null; readonly error: null }
  | { readonly status: 'success'; readonly data: T; readonly error: null }
  | { readonly status: 'error'; readonly data: null; readonly error: E };
```

### 2.3. Branded Types for Domain Identifiers
To prevent accidental substitution of string/number IDs (e.g., passing a `RoomId` into a `ProfessorId` parameter), utilize branded types:

```typescript
export type Brand<K, T> = K & { readonly __brand: T };

export type RoomId = Brand<string, 'RoomId'>;
export type ProfessorId = Brand<string, 'ProfessorId'>;
export type ReservationId = Brand<string, 'ReservationId'>;

export function createRoomId(raw: string): RoomId {
  // Validate ID format if necessary
  return raw as RoomId;
}
```

### 2.4. Types vs. Interfaces
* Use `interface` when defining extensible object shapes, class implementations, or public contracts.
* Use `type` for unions, intersections, primitives, tuples, utility mappings, and branded types.
* Prefer `readonly` modifiers on interface properties and arrays where immutability is expected.

### 2.5. Explicit Return Types
All functions, component helpers, custom hooks, and service methods must explicitly state their return type. Do not rely on type inference for exported boundaries:

```typescript
// ❌ REJECTED: Missing explicit return type
export const calculateSlotAvailability = (start: Date, end: Date) => {
  return start < end;
};

// ✅ APPROVED: Explicit, self-documenting return type
export const calculateSlotAvailability = (start: Date, end: Date): boolean => {
  return start < end;
};
```

---

## 3. Modular 3-Tier Component Architecture

All UI features must be organized into three distinct tiers:

```
┌─────────────────────────────────────────────────────────────┐
│  Presentation Layer: UI Components (components/*.tsx)       │
│  - Pure rendering, JSX, Tailwind styles, ARIA accessibility  │
│  - No direct fetch, no storage access, no complex algorithms│
└──────────────────────────────┬──────────────────────────────┘
                               │ consumes props / hooks
┌──────────────────────────────▼──────────────────────────────┐
│  Domain Layer: Custom React Hooks (hooks/*.ts)              │
│  - Reactive state management, lifecycles, memoization       │
│  - Coordinates service calls and event handlers             │
└──────────────────────────────┬──────────────────────────────┘
                               │ delegates data operations
┌──────────────────────────────▼──────────────────────────────┐
│  Infrastructure Layer: Services & Clients (services/*.ts)   │
│  - Pure TypeScript, zero React dependency                   │
│  - HTTP requests, caching, transformation, business logic   │
└─────────────────────────────────────────────────────────────┘
```

### 3.1. Presentation Layer Rules
* **File Length:** Maximum 150 lines. Components exceeding 150 lines must be split into logical sub-components.
* **Stateless by Default:** Favor pure functional presentation. If a component requires state, verify whether it belongs in a dedicated hook or local UI state (e.g., dropdown toggle).
* **Component File Anatomy:**
  1. External library imports (React, Lucide icons, etc.)
  2. Internal absolute imports (components, hooks, services, types)
  3. Props interface definition
  4. Component function definition
  5. Export statement

```tsx
// ✅ Example Component Anatomy
import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { ReservationSlot } from '@/types/eduscheduler';

export interface ReservationCardProps {
  readonly slot: ReservationSlot;
  readonly isSelected: boolean;
  readonly onSelect: (slotId: string) => void;
  readonly className?: string;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  slot,
  isSelected,
  onSelect,
  className,
}) => {
  const handleClick = (): void => {
    onSelect(slot.id);
  };

  return (
    <article
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={cn(
        'flex flex-col p-4 rounded-xl border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        isSelected ? 'border-primary bg-primary/10' : 'border-border bg-surface',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-foreground">{slot.roomName}</span>
        <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-sm text-muted-foreground">{slot.timeRangeFormatted}</p>
    </article>
  );
};
```

### 3.2. Custom Hooks (Domain Layer) Rules
* Hooks must begin with the `use` prefix (e.g., `useEduScheduler`, `useSpatialNavigation`).
* Hooks must return a strictly typed tuple or object with state and memoized action handlers.
* Logic within hooks must be unit-testable via `@testing-library/react`.

```typescript
// ✅ Example Hook Pattern
import { useState, useCallback } from 'react';
import { reservationService } from '@/services/reservationService';
import type { RemoteData } from '@/types/system';
import type { ReservationSlot } from '@/types/eduscheduler';

export interface UseReservationsReturn {
  readonly state: RemoteData<readonly ReservationSlot[]>;
  readonly selectedSlotId: string | null;
  readonly selectSlot: (id: string) => void;
  readonly refresh: () => Promise<void>;
}

export function useReservations(roomId: string): UseReservationsReturn {
  const [state, setState] = useState<RemoteData<readonly ReservationSlot[]>>({
    status: 'idle',
    data: null,
    error: null,
  });
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setState({ status: 'loading', data: null, error: null });
    try {
      const data = await reservationService.getSlotsByRoom(roomId);
      setState({ status: 'success', data, error: null });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setState({ status: 'error', data: null, error });
    }
  }, [roomId]);

  const selectSlot = useCallback((id: string): void => {
    setSelectedSlotId(id);
  }, []);

  return { state, selectedSlotId, selectSlot, refresh };
}
```

### 3.3. Services & Infrastructure Layer Rules
* Services must have **zero imports from React** (`react`, `react-dom`).
* Provide clear asynchronous method signatures with typed responses and input payloads.
* Encapsulate HTTP headers, authentication tokens, retry logic, and AbortSignals.

---

## 4. Clean Code Principles & Naming Conventions

### 4.1. Naming Guidelines
* **Booleans:** Must be prefixed with affirmative modal verbs:
  - `isEnabled`, `isVisible`, `hasConflict`, `canReserve`, `shouldAnimate`.
* **Event Handlers:**
  - Component internal methods: `handle<Action>` (e.g., `handleSubmit`, `handleKeyDown`).
  - Component props: `on<Action>` (e.g., `onSubmit`, `onKeyDown`).
* **Variables & Constants:**
  - Standard variables: `camelCase`.
  - Global constants & configuration: `SCREAMING_SNAKE_CASE`.
  - Types, Interfaces, Enums, Components: `PascalCase`.
* **Files & Directories:**
  - Components: `PascalCase.tsx` (e.g., `ReservationGrid.tsx`).
  - Hooks: `camelCase.ts` (e.g., `useSpatialNavigation.ts`).
  - Services/Utils: `camelCase.ts` (e.g., `apiClient.ts`, `dateFormatter.ts`).
  - Types: `kebab-case.ts` (e.g., `eduscheduler.ts`, `smart-tv.ts`).

### 4.2. Function Complexity & Single Responsibility
* Functions must not exceed 40 lines of code.
* Maximum cyclomatic complexity per function: **6**.
* Avoid deeply nested if/else blocks; use early returns (guard clauses).

---

## 5. Automated Error Handling & Resilience

### 5.1. Error Architecture
Application errors must be categorized into typed classes:

```typescript
export abstract class AppError extends Error {
  public abstract readonly code: string;
  public constructor(message: string, public readonly details?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NetworkError extends AppError {
  public readonly code = 'NETWORK_ERROR';
}

export class ConflictError extends AppError {
  public readonly code = 'SLOT_CONFLICT_ERROR';
  public constructor(message: string, public readonly conflictingSlotId: string) {
    super(message);
  }
}

export class ValidationError extends AppError {
  public readonly code = 'VALIDATION_ERROR';
}
```

### 5.2. React Error Boundaries
Wrap critical sections (such as the interactive EduScheduler calendar and the LightningJS TV canvas) in dedicated Error Boundaries that display graceful fallback UI with recovery actions.

---

## 6. Tailwind CSS & Design System Conventions

* **No Hardcoded Hex Values:** Always reference Tailwind theme tokens defined in `tailwind.config.ts` (e.g., `bg-surface`, `text-primary`, `border-border`).
* **Utility Ordering Convention:** Maintain consistent class ordering:
  1. Layout: `display`, `position`, `flex-direction`, `grid-template`, `z-index`
  2. Spacing: `gap`, `padding`, `margin`
  3. Sizing: `width`, `min-width`, `height`, `min-height`
  4. Typography: `font-size`, `font-weight`, `line-height`, `text-color`
  5. Visuals: `background`, `border`, `rounded`, `shadow`, `opacity`
  6. States: `hover:`, `focus-visible:`, `active:`, `disabled:`
* **Utility Merge Helper:** Always use `cn()` for dynamic class merging:
  ```typescript
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
  }
  ```

---

## 7. Git Commit & Verification Standards

### 7.1. Conventional Commits
All commits must follow: `<type>(<scope>): <summary>`

- `feat`: User-facing functionality or showcase expansion
- `fix`: Bug or defect resolution
- `refactor`: Structural improvement without behavior changes
- `perf`: Optimization (e.g., render reduction, canvas frame-budgeting)
- `test`: Addition or modification of test suites
- `docs`: Documentation updates only
- `chore`: Tooling, build config, dependency updates

### 7.2. Verification Pre-Flight Protocol
Before marking any task complete or submitting a commit, run:

```bash
# 1. Typecheck: Zero errors required
npm run typecheck

# 2. Linting: Zero errors, zero warnings allowed
npm run lint

# 3. Tests: Full suite must pass
npm run test

# 4. Build: Clean production bundle compilation
npm run build
```
