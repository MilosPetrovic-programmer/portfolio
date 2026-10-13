# Testing Strategy & Quality Assurance Architecture

> **Document ID:** DOC-SYS-003  
> **Status:** Active  
> **Role:** Test Suite Architecture & Verification Protocol

---

## 1. Testing Philosophy

Testing is not treated as a post-implementation chore; it is an architectural contract ensuring that complex domain logic—such as **interval collision math** and **spatial focus trees**—remains 100% regression-free.

### The Testing Pyramid
```
      / \
     / E2E \       Playwright: Critical user flows & canvas sanity checks (< 5% of tests)
    /-------\
   / Component\    React Testing Library: User interactions & ARIA accessibility (25% of tests)
  /------------\
 /  Hook Tests  \  renderHook: Asynchronous state flows & optimistic updates (30% of tests)
/----------------\
/   Unit Tests   \ Vitest: Pure algorithms, interval trees, spatial math (40% of tests)
------------------
```

---

## 2. Test Suites & Implementation Standards

### 2.1. Pure Unit Tests (Vitest)
Unit tests validate pure functions, date algorithms, and domain services in isolation with zero DOM dependencies.

* **Target Coverage:** `> 90%` for critical algorithmic engines.
* **Execution Speed:** Full unit test suite must complete in `< 2.0 seconds`.

```typescript
// ✅ Example: Unit test for EduScheduler interval collision
import { describe, it, expect } from 'vitest';
import { checkIntervalOverlap } from '@/services/eduscheduler/conflictEngine';

describe('checkIntervalOverlap', () => {
  it('detects overlapping time intervals correctly', () => {
    const slotA = { start: new Date('2026-10-12T10:00:00Z'), end: new Date('2026-10-12T11:30:00Z') };
    const slotB = { start: new Date('2026-10-12T11:00:00Z'), end: new Date('2026-10-12T12:00:00Z') };

    const result = checkIntervalOverlap(slotA, slotB);
    expect(result.hasOverlap).toBe(true);
  });

  it('allows adjacent non-overlapping intervals (touching boundaries)', () => {
    const slotA = { start: new Date('2026-10-12T09:00:00Z'), end: new Date('2026-10-12T10:00:00Z') };
    const slotB = { start: new Date('2026-10-12T10:00:00Z'), end: new Date('2026-10-12T11:00:00Z') };

    const result = checkIntervalOverlap(slotA, slotB);
    expect(result.hasOverlap).toBe(false);
  });
});
```

### 2.2. Custom Hook Tests (`renderHook`)
Hooks encapsulate asynchronous state machines and optimistic updates. Testing hooks in isolation validates state transitions without rendering full UI pages.

```typescript
// ✅ Example: Hook test for optimistic reservation rollback
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEduScheduler } from '@/hooks/useEduScheduler';
import { reservationService } from '@/services/reservationService';

describe('useEduScheduler optimistic updates', () => {
  it('reverts optimistic reservation when server returns 409 conflict', async () => {
    vi.spyOn(reservationService, 'createReservation').mockRejectedValueOnce(
      new Error('SLOT_CONFLICT')
    );

    const { result } = renderHook(() => useEduScheduler());

    await act(async () => {
      await result.current.bookSlot({
        roomId: 'room-101',
        start: '10:00',
        end: '11:00',
      });
    });

    expect(result.current.conflictError).not.toBeNull();
    expect(result.current.reservations).toHaveLength(0); // Rollback confirmed
  });
});
```

### 2.3. Component Integration Tests (React Testing Library)
* **Accessibility-First Queries:** Tests must select elements using accessible roles (`getByRole('button', { name: /book/i })`), labels (`getByLabelText`), or text. Querying by class name or CSS selectors is strictly prohibited.
* **Keyboard Navigation Testing:** Verify `Tab` order and focus trapping using `@testing-library/user-event`.

---

## 3. Mocking & Network Simulation

* **Mock Service Worker (MSW):** Intercepts network requests at the transport level to simulate the PHP 8.x REST API, returning realistic HTTP status codes (200, 201, 400, 409 Conflict, 500).
* **Clock Virtualization:** Use `vi.useFakeTimers()` for testing timed animations, debounce handlers, and scheduling calendar time-travel.

---

## 4. Pre-Commit Quality Gate

Every test suite must run clean in CI and local pre-commit hooks:
```bash
npm run test:run     # Vitest headless single-run
npm run test:coverage # Vitest coverage report
```
Any test failure blocks commit creation and PR merging.
