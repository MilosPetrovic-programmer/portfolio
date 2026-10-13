import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useEduScheduler } from './useEduScheduler';
import { reservationService } from '@/services/eduscheduler/reservationService';
import { toRoomId } from '@/types/eduscheduler';

describe('useEduScheduler hook', () => {
  beforeEach(() => {
    reservationService.resetToDefaults();
  });

  it('initializes with default room and loads reservations', async () => {
    const { result } = renderHook(() => useEduScheduler());

    await waitFor(() => {
      expect(result.current.selectedRoom.name).toBe('Turing Hall A');
      expect(result.current.selectedStartHour).toBe(11);
      expect(result.current.selectedEndHour).toBe(13);
    });
  });

  it('switches rooms and updates active selection', async () => {
    const { result } = renderHook(() => useEduScheduler());

    await act(async () => {
      result.current.setSelectedRoomId(toRoomId('room-102'));
    });

    await waitFor(() => {
      expect(result.current.selectedRoom.id).toBe(toRoomId('room-102'));
      expect(result.current.selectedRoom.name).toBe('Lovelace Systems Lab');
    });
  });

  it('rolls back optimistic reservation when 409 conflict is simulated', async () => {
    const { result } = renderHook(() => useEduScheduler());

    await act(async () => {
      result.current.toggleSimulateConflict();
    });

    expect(result.current.isSimulatingConflict).toBe(true);

    let success = true;
    await act(async () => {
      success = await result.current.bookSlot('Mobile Systems', 'Prof. Milos Petrovic');
    });

    expect(success).toBe(false);
    expect(result.current.conflictError).not.toBeNull();
    expect(result.current.conflictError?.title).toContain('Concurrent Lock');
  });
});
