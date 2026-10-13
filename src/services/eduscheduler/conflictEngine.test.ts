import { describe, it, expect } from 'vitest';
import {
  checkIntervalOverlap,
  checkHourOverlap,
  detectReservationConflict,
} from './conflictEngine';
import { toReservationId, toRoomId, type ReservationSlot } from '@/types/eduscheduler';

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

describe('checkHourOverlap', () => {
  it('identifies partial overlapping hours', () => {
    expect(checkHourOverlap(9, 11, 10, 12)).toBe(true);
    expect(checkHourOverlap(10, 12, 9, 11)).toBe(true);
  });

  it('identifies enclosed hours', () => {
    expect(checkHourOverlap(9, 13, 10, 11)).toBe(true);
  });

  it('allows adjacent non-overlapping hours', () => {
    expect(checkHourOverlap(9, 10, 10, 11)).toBe(false);
    expect(checkHourOverlap(11, 12, 9, 10)).toBe(false);
  });
});

describe('detectReservationConflict', () => {
  const existing: readonly ReservationSlot[] = [
    {
      id: toReservationId('res-1'),
      roomId: toRoomId('room-101'),
      roomName: 'Lecture Hall A',
      title: 'Advanced Operating Systems',
      professorName: 'Dr. Aris Thorne',
      startHour: 10,
      endHour: 12,
    },
  ];

  it('returns collision details when slot overlaps', () => {
    const result = detectReservationConflict({ startHour: 11, endHour: 13 }, existing);
    expect(result.hasOverlap).toBe(true);
    expect(result.conflictingSlotId).toBe(toReservationId('res-1'));
    expect(result.conflictingTitle).toBe('Advanced Operating Systems');
  });

  it('returns false when requested slot is clear', () => {
    const result = detectReservationConflict({ startHour: 13, endHour: 15 }, existing);
    expect(result.hasOverlap).toBe(false);
  });
});
