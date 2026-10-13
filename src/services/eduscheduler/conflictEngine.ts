import type {
  TimeInterval,
  OverlapCheckResult,
  ReservationSlot,
} from '@/types/eduscheduler';

/**
 * Validates whether two Date time intervals overlap.
 * Adjacent touching intervals (where endA === startB or endB === startA)
 * are considered non-overlapping.
 */
export function checkIntervalOverlap(
  slotA: TimeInterval,
  slotB: TimeInterval
): OverlapCheckResult {
  const startA = slotA.start.getTime();
  const endA = slotA.end.getTime();
  const startB = slotB.start.getTime();
  const endB = slotB.end.getTime();

  const hasOverlap = startA < endB && endA > startB;

  return { hasOverlap };
}

/**
 * Validates whether two numeric hour intervals [start, end) overlap.
 */
export function checkHourOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number
): boolean {
  return startA < endB && endA > startB;
}

/**
 * Scans a collection of existing reservations for any slot collision.
 */
export function detectReservationConflict(
  newSlot: { startHour: number; endHour: number },
  existingSlots: readonly ReservationSlot[]
): OverlapCheckResult {
  for (const existing of existingSlots) {
    if (
      checkHourOverlap(
        newSlot.startHour,
        newSlot.endHour,
        existing.startHour,
        existing.endHour
      )
    ) {
      return {
        hasOverlap: true,
        conflictingSlotId: existing.id,
        conflictingTitle: existing.title,
      };
    }
  }
  return { hasOverlap: false };
}
