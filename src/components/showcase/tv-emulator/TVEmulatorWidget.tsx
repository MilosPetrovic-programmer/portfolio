import React from 'react';
import { Sparkles, Navigation } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { useTVEmulator } from '@/hooks/useTVEmulator';
import { TVTelemetryHUD } from './TVTelemetryHUD';
import { TVScreen } from './TVScreen';
import { TVRemoteControl } from './TVRemoteControl';

export const TVEmulatorWidget: React.FC = () => {
  const {
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
  } = useTVEmulator();

  const handleCardClick = (rowIndex: number, colIndex: number): void => {
    // Allows direct mouse clicking as a companion to the D-Pad
    if (focusCoords.rowIndex === rowIndex && focusCoords.colIndex === colIndex) {
      selectCurrentItem();
    } else {
      const rowDiff = rowIndex - focusCoords.rowIndex;
      const colDiff = colIndex - focusCoords.colIndex;
      if (rowDiff > 0) navigate('down');
      else if (rowDiff < 0) navigate('up');
      else if (colDiff > 0) navigate('right');
      else if (colDiff < 0) navigate('left');
    }
  };

  return (
    <Card variant="surface" className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-xl">Smart TV LightningJS Emulator</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Interactive 10-Foot UI
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            WebGL/Canvas scene graph emulator with deterministic D-Pad spatial navigation, 60 FPS budgets, and texture recycling.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Navigation className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span>Use Keyboard Arrow Keys + Enter or Click the Remote</span>
        </div>
      </div>

      <TVTelemetryHUD telemetry={telemetry} />

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <div className="flex-1 w-full">
          <TVScreen
            isPoweredOn={isPoweredOn}
            catalog={catalog}
            focusCoords={focusCoords}
            activeMedia={activeMedia}
            notification={selectedNotification}
            onCardClick={handleCardClick}
          />
        </div>

        <div className="shrink-0 flex justify-center">
          <TVRemoteControl
            isPoweredOn={isPoweredOn}
            isKeyboardCapturing={isKeyboardCapturing}
            onNavigate={navigate}
            onSelect={selectCurrentItem}
            onTogglePower={togglePower}
            onToggleKeyboard={toggleKeyboardCapture}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
          Hard Frame Budget: Zero DOM reflows; focus transforms handled via hardware layers.
        </span>
        <span className="font-mono text-[11px]">
          Target Architecture: Samsung Tizen / LG webOS / LightningJS 3.x
        </span>
      </div>
    </Card>
  );
};
