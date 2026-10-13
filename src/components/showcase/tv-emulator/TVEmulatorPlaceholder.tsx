import React from 'react';
import { Tv, Sparkles, Navigation } from 'lucide-react';
import { Card } from '@/components/common/Card';

export const TVEmulatorPlaceholder: React.FC = () => {
  return (
    <Card variant="surface" className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Tv className="w-5 h-5 text-primary" aria-hidden="true" />
          <h3 className="font-semibold text-foreground text-lg">
            Smart TV LightningJS Emulator
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
          Ready for Feature Implementation
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Hardware-constrained 10-foot UI simulation running 60 FPS WebGL/Canvas render trees,
        D-Pad spatial navigation state machines, and texture memory recycling.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Navigation className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span>Spatial focus tree types and keyboard bindings mapped</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span>Canvas frame budget telemetry interfaces scaffolded</span>
        </div>
      </div>
    </Card>
  );
};
