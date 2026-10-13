import { AppError } from '@/services/api/apiClient';
import {
  toRoomId,
  toReservationId,
  type Classroom,
  type ReservationSlot,
  type CreateBookingPayload,
  type RoomId,
} from '@/types/eduscheduler';
import { detectReservationConflict } from './conflictEngine';

export class ConflictError extends AppError {
  public readonly code = 'SLOT_CONFLICT_ERROR';
  public constructor(
    message: string,
    public readonly conflictingSlotTitle: string,
    public readonly conflictingSlotId?: string
  ) {
    super(message);
  }
}

export const INITIAL_CLASSROOMS: readonly Classroom[] = [
  {
    id: toRoomId('room-101'),
    name: 'Turing Hall A',
    building: 'Computing Sciences Wing',
    capacity: 160,
    roomType: 'lecture',
  },
  {
    id: toRoomId('room-102'),
    name: 'Lovelace Systems Lab',
    building: 'Engineering Annex',
    capacity: 45,
    roomType: 'lab',
  },
  {
    id: toRoomId('room-201'),
    name: 'Shannon Seminar 201',
    building: 'Mathematics Tower',
    capacity: 30,
    roomType: 'seminar',
  },
];

const INITIAL_RESERVATIONS: readonly ReservationSlot[] = [
  {
    id: toReservationId('res-101-1'),
    roomId: toRoomId('room-101'),
    roomName: 'Turing Hall A',
    title: 'Distributed Systems & Microservices',
    professorName: 'Prof. Milos Petrovic',
    startHour: 9,
    endHour: 11,
  },
  {
    id: toReservationId('res-101-2'),
    roomId: toRoomId('room-101'),
    roomName: 'Turing Hall A',
    title: 'Compiler Construction',
    professorName: 'Dr. Elena Vance',
    startHour: 13,
    endHour: 15,
  },
  {
    id: toReservationId('res-102-1'),
    roomId: toRoomId('room-102'),
    roomName: 'Lovelace Systems Lab',
    title: 'Linux Kernel Internals Lab',
    professorName: 'Prof. Milos Petrovic',
    startHour: 10,
    endHour: 12,
  },
  {
    id: toReservationId('res-201-1'),
    roomId: toRoomId('room-201'),
    roomName: 'Shannon Seminar 201',
    title: 'Information Theory Colloquium',
    professorName: 'Dr. Marcus Webb',
    startHour: 14,
    endHour: 16,
  },
];

class ReservationService {
  private reservations: ReservationSlot[] = [...INITIAL_RESERVATIONS];

  public async getClassrooms(): Promise<readonly Classroom[]> {
    return Promise.resolve(INITIAL_CLASSROOMS);
  }

  public async getReservationsByRoom(roomId: RoomId): Promise<readonly ReservationSlot[]> {
    return Promise.resolve(this.reservations.filter((r) => r.roomId === roomId));
  }

  public async createReservation(payload: CreateBookingPayload): Promise<ReservationSlot> {
    // Artificial network round-trip delay to demonstrate asynchronous & optimistic UI
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (payload.simulateConflict) {
      throw new ConflictError(
        'Concurrent 409 Conflict: Slot was reserved by Department Chair during checkout',
        'Advanced Algorithms (Concurrent Lock)',
        'conflict-simulated'
      );
    }

    const roomSlots = this.reservations.filter((r) => r.roomId === payload.roomId);
    const conflict = detectReservationConflict(
      { startHour: payload.startHour, endHour: payload.endHour },
      roomSlots
    );

    if (conflict.hasOverlap) {
      throw new ConflictError(
        `Classroom is already reserved during ${payload.startHour}:00 - ${payload.endHour}:00`,
        conflict.conflictingTitle ?? 'Existing Booking',
        conflict.conflictingSlotId
      );
    }

    const classroom = INITIAL_CLASSROOMS.find((c) => c.id === payload.roomId);
    const newReservation: ReservationSlot = {
      id: toReservationId(`res-${Date.now()}`),
      roomId: payload.roomId,
      roomName: classroom?.name ?? 'Classroom',
      title: payload.title,
      professorName: payload.professorName,
      startHour: payload.startHour,
      endHour: payload.endHour,
    };

    this.reservations = [...this.reservations, newReservation];
    return newReservation;
  }

  public resetToDefaults(): void {
    this.reservations = [...INITIAL_RESERVATIONS];
  }
}

export const reservationService = new ReservationService();
