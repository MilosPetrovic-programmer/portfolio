import { describe, it, expect } from 'vitest';
import { checkIntervalOverlap } from './conflictEngine';

describe('checkIntervalOverlap', () => {
  it('detects overlapping time intervals correctly', () => {
    const slotA = {
      start: new Date('2026-10-12T10:00:00Z'),
      end: new Date('2026-10-12T11:30:00Z'),
    };
    const slotB = {
      start: new Date('2026-10-12T11:00:00Z'),
      end: new Date('2026-10-12T12:00:00Z'),
    };

    const result = checkIntervalOverlap(slotA, slotB);
    expect(result.hasOverlap).toBe(true);
  });

  it('allows adjacent non-overlapping intervals (touching boundaries)', () => {
    const slotA = {
      start: new Date('2026-10-12T09:00:00Z'),
      end: new Date('2026-10-12T10:00:00Z'),
    };
    const slotB = {
      start: new Date('2026-10-12T10:00:00Z'),
      end: new Date('2026-10-12T11:00:00Z'),
    };

    const result = checkIntervalOverlap(slotA, slotB);
    expect(result.hasOverlap).toBe(false);
  });
});
