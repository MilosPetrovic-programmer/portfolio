import { useState, useEffect, useCallback } from 'react';
import {
  reservationService,
  ConflictError,
  INITIAL_CLASSROOMS,
} from '@/services/eduscheduler/reservationService';
import {
  toReservationId,
  type Classroom,
  type ReservationSlot,
  type RoomId,
} from '@/types/eduscheduler';

export interface UseEduSchedulerReturn {
  readonly classrooms: readonly Classroom[];
  readonly selectedRoom: Classroom;
  readonly reservations: readonly ReservationSlot[];
  readonly isPending: boolean;
  readonly conflictError: { message: string; title: string } | null;
  readonly selectedStartHour: number;
  readonly selectedEndHour: number;
  readonly isSimulatingConflict: boolean;
  readonly setSelectedRoomId: (id: RoomId) => void;
  readonly setSelectedHours: (start: number, end: number) => void;
  readonly toggleSimulateConflict: () => void;
  readonly dismissConflict: () => void;
  readonly bookSlot: (title: string, professorName: string) => Promise<boolean>;
  readonly resetSchedule: () => void;
}

export function useEduScheduler(): UseEduSchedulerReturn {
  const classrooms = INITIAL_CLASSROOMS;
  const initialRoom = classrooms[0] ?? {
    id: 'room-101' as RoomId,
    name: 'Turing Hall A',
    building: 'Computing Sciences Wing',
    capacity: 160,
    roomType: 'lecture',
  };
  const [selectedRoomId, setSelectedRoomIdState] = useState<RoomId>(initialRoom.id);
  const [reservations, setReservations] = useState<readonly ReservationSlot[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [conflictError, setConflictError] = useState<{ message: string; title: string } | null>(null);
  const [selectedStartHour, setSelectedStartHour] = useState<number>(11);
  const [selectedEndHour, setSelectedEndHour] = useState<number>(13);
  const [isSimulatingConflict, setIsSimulatingConflict] = useState<boolean>(false);

  const selectedRoom = classrooms.find((c) => c.id === selectedRoomId) ?? initialRoom;

  const loadReservations = useCallback(async (roomId: RoomId): Promise<void> => {
    const data = await reservationService.getReservationsByRoom(roomId);
    setReservations(data);
  }, []);

  useEffect(() => {
    void loadReservations(selectedRoomId);
  }, [selectedRoomId, loadReservations]);

  const setSelectedRoomId = useCallback((id: RoomId): void => {
    setSelectedRoomIdState(id);
    setConflictError(null);
  }, []);

  const setSelectedHours = useCallback((start: number, end: number): void => {
    setSelectedStartHour(start);
    setSelectedEndHour(end);
    setConflictError(null);
  }, []);

  const toggleSimulateConflict = useCallback((): void => {
    setIsSimulatingConflict((prev) => !prev);
  }, []);

  const dismissConflict = useCallback((): void => {
    setConflictError(null);
  }, []);

  const bookSlot = useCallback(
    async (title: string, professorName: string): Promise<boolean> => {
      setConflictError(null);
      setIsPending(true);

      const optimisticId = toReservationId(`temp-${Date.now()}`);
      const optimisticSlot: ReservationSlot = {
        id: optimisticId,
        roomId: selectedRoomId,
        roomName: selectedRoom.name,
        title,
        professorName,
        startHour: selectedStartHour,
        endHour: selectedEndHour,
        isOptimistic: true,
      };

      // 1. Snapshot previous state & apply optimistic delta
      const previousReservations = reservations;
      setReservations((prev) => [...prev, optimisticSlot]);

      try {
        // 2. Dispatch to backend simulation
        const created = await reservationService.createReservation({
          roomId: selectedRoomId,
          title,
          professorName,
          startHour: selectedStartHour,
          endHour: selectedEndHour,
          simulateConflict: isSimulatingConflict,
        });

        // 3. Reconcile optimistic slot with authoritative server record
        setReservations((prev) =>
          prev.map((slot) => (slot.id === optimisticId ? created : slot))
        );
        setIsPending(false);
        return true;
      } catch (err: unknown) {
        // 4. On Conflict / Error: Rollback state cleanly & expose error
        setReservations(previousReservations);
        setIsPending(false);

        if (err instanceof ConflictError) {
          setConflictError({
            message: err.message,
            title: err.conflictingSlotTitle,
          });
        } else {
          setConflictError({
            message: 'An unexpected reservation error occurred.',
            title: 'System Error',
          });
        }
        return false;
      }
    },
    [
      reservations,
      selectedRoomId,
      selectedRoom.name,
      selectedStartHour,
      selectedEndHour,
      isSimulatingConflict,
    ]
  );

  const resetSchedule = useCallback((): void => {
    reservationService.resetToDefaults();
    void loadReservations(selectedRoomId);
    setConflictError(null);
  }, [selectedRoomId, loadReservations]);

  return {
    classrooms,
    selectedRoom,
    reservations,
    isPending,
    conflictError,
    selectedStartHour,
    selectedEndHour,
    isSimulatingConflict,
    setSelectedRoomId,
    setSelectedHours,
    toggleSimulateConflict,
    dismissConflict,
    bookSlot,
    resetSchedule,
  };
}
