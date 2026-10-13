import React from 'react';
import { Activity, Cpu, Layers, Terminal } from 'lucide-react';
import type { TVTelemetry } from '@/types/smart-tv';

export interface TVTelemetryHUDProps {
  readonly telemetry: TVTelemetry;
}

export const TVTelemetryHUD: React.FC<TVTelemetryHUDProps> = ({ telemetry }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-surface/80 text-xs font-mono">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
        <span className="text-muted-foreground">Frame Rate:</span>
        <strong className="text-emerald-500 font-bold">{telemetry.fps} FPS (16.6ms)</strong>
      </div>

      <div className="flex items-center gap-2">
        <Cpu className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
        <span className="text-muted-foreground">Heap Memory:</span>
        <strong className="text-foreground">{telemetry.memoryUsageMB} MB / 512 MB</strong>
      </div>

      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
        <span className="text-muted-foreground">Draw Calls:</span>
        <strong className="text-foreground">{telemetry.drawCalls}</strong>
      </div>

      <div className="flex items-center gap-2">
        <Terminal className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
        <span className="text-muted-foreground">Action:</span>
        <span className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[11px]">
          {telemetry.lastAction}
        </span>
      </div>
    </div>
  );
};
