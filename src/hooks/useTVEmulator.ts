import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  STREAMING_CATALOG,
  calculateNextFocus,
} from '@/services/tv/spatialNavigationEngine';
import type {
  MediaItem,
  MediaRow,
  DPadDirection,
  TVFocusCoordinates,
  TVTelemetry,
} from '@/types/smart-tv';

export interface UseTVEmulatorReturn {
  readonly catalog: readonly MediaRow[];
  readonly focusCoords: TVFocusCoordinates;
  readonly activeMedia: MediaItem;
  readonly telemetry: TVTelemetry;
  readonly isPoweredOn: boolean;
  readonly isKeyboardCapturing: boolean;
  readonly selectedNotification: string | null;
  readonly navigate: (direction: DPadDirection) => void;
  readonly selectCurrentItem: () => void;
  readonly togglePower: () => void;
  readonly toggleKeyboardCapture: () => void;
}

export function useTVEmulator(): UseTVEmulatorReturn {
  const catalog = STREAMING_CATALOG;
  const [focusCoords, setFocusCoords] = useState<TVFocusCoordinates>({
    rowIndex: 0,
    colIndex: 0,
  });
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(true);
  const [isKeyboardCapturing, setIsKeyboardCapturing] = useState<boolean>(true);
  const [lastAction, setLastAction] = useState<string>('INIT_BOOT');
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  const activeMedia = useMemo<MediaItem>(() => {
    const activeRow = catalog[focusCoords.rowIndex] ?? catalog[0];
    return (
      activeRow?.items[focusCoords.colIndex] ??
      activeRow?.items[0] ?? {
        id: 'fallback',
        title: 'Stream Preview',
        category: 'General',
        year: 2026,
        rating: '5.0 ★',
        duration: '1h 30m',
        accentColor: 'from-blue-600 to-indigo-900',
      }
    );
  }, [catalog, focusCoords.rowIndex, focusCoords.colIndex]);

  const navigate = useCallback(
    (direction: DPadDirection): void => {
      if (!isPoweredOn) return;
      setFocusCoords((prev) => calculateNextFocus(prev, direction, catalog));
      setLastAction(`KEY_${direction.toUpperCase()}`);
    },
    [isPoweredOn, catalog]
  );

  const selectCurrentItem = useCallback((): void => {
    if (!isPoweredOn) return;
    setLastAction('KEY_ENTER_SELECT');
    setSelectedNotification(`Playing: "${activeMedia.title}" (${activeMedia.rating})`);
    setTimeout(() => {
      setSelectedNotification(null);
    }, 3500);
  }, [isPoweredOn, activeMedia]);

  const togglePower = useCallback((): void => {
    setIsPoweredOn((prev) => {
      const next = !prev;
      setLastAction(next ? 'SYSTEM_POWER_ON' : 'SYSTEM_STANDBY');
      return next;
    });
  }, []);

  const toggleKeyboardCapture = useCallback((): void => {
    setIsKeyboardCapturing((prev) => !prev);
  }, []);

  // Global remote keyboard listeners
  useEffect(() => {
    if (!isKeyboardCapturing || !isPoweredOn) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigate('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          navigate('down');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          navigate('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigate('right');
          break;
        case 'Enter':
          event.preventDefault();
          selectCurrentItem();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isKeyboardCapturing, isPoweredOn, navigate, selectCurrentItem]);

  const telemetry: TVTelemetry = {
    fps: isPoweredOn ? 60 : 0,
    memoryUsageMB: isPoweredOn ? 42.4 : 0,
    drawCalls: isPoweredOn ? 12 : 0,
    activeNodeId: isPoweredOn ? activeMedia.id : 'STANDBY',
    lastAction,
  };

  return {
    catalog,
    focusCoords,
    activeMedia,
    telemetry,
    isPoweredOn,
    isKeyboardCapturing,
    selectedNotification,
    navigate,
    selectCurrentItem,
    togglePower,
    toggleKeyboardCapture,
  };
}
