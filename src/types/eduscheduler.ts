import type { Brand } from './system';

export type RoomId = Brand<string, 'RoomId'>;
export type ReservationId = Brand<string, 'ReservationId'>;
export type ProfessorId = Brand<string, 'ProfessorId'>;

export function toRoomId(raw: string): RoomId {
  return raw as RoomId;
}

export function toReservationId(raw: string): ReservationId {
  return raw as ReservationId;
}

export interface TimeInterval {
  readonly start: Date;
  readonly end: Date;
}

export interface Classroom {
  readonly id: RoomId;
  readonly name: string;
  readonly building: string;
  readonly capacity: number;
  readonly roomType: 'lecture' | 'lab' | 'seminar';
}

export interface ReservationSlot {
  readonly id: ReservationId;
  readonly roomId: RoomId;
  readonly roomName: string;
  readonly title: string;
  readonly professorName: string;
  readonly startHour: number; // e.g. 9 for 09:00
  readonly endHour: number;   // e.g. 11 for 11:00
  readonly isOptimistic?: boolean;
}

export interface OverlapCheckResult {
  readonly hasOverlap: boolean;
  readonly conflictingSlotId?: ReservationId;
  readonly conflictingTitle?: string;
}

export interface CreateBookingPayload {
  readonly roomId: RoomId;
  readonly title: string;
  readonly professorName: string;
  readonly startHour: number;
  readonly endHour: number;
  readonly simulateConflict?: boolean;
}
