import type { TimeInterval, OverlapCheckResult } from '@/types/eduscheduler';

/**
 * Validates whether two time intervals overlap.
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

  // Overlap occurs if slotA starts before slotB ends AND slotA ends after slotB starts
  const hasOverlap = startA < endB && endA > startB;

  return { hasOverlap };
}
