import type { Brand } from './system';

export type RoomId = Brand<string, 'RoomId'>;
export type ReservationId = Brand<string, 'ReservationId'>;
export type ProfessorId = Brand<string, 'ProfessorId'>;

export interface TimeInterval {
  readonly start: Date;
  readonly end: Date;
}

export interface ReservationSlot {
  readonly id: ReservationId;
  readonly roomId: RoomId;
  readonly roomName: string;
  readonly timeRangeFormatted: string;
  readonly interval: TimeInterval;
  readonly professorName: string;
}

export interface OverlapCheckResult {
  readonly hasOverlap: boolean;
  readonly conflictingSlotId?: ReservationId;
}
