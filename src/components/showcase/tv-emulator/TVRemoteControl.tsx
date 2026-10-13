import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Power,
  Keyboard,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { DPadDirection } from '@/types/smart-tv';

export interface TVRemoteControlProps {
  readonly isPoweredOn: boolean;
  readonly isKeyboardCapturing: boolean;
  readonly onNavigate: (direction: DPadDirection) => void;
  readonly onSelect: () => void;
  readonly onTogglePower: () => void;
  readonly onToggleKeyboard: () => void;
}

export const TVRemoteControl: React.FC<TVRemoteControlProps> = ({
  isPoweredOn,
  isKeyboardCapturing,
  onNavigate,
  onSelect,
  onTogglePower,
  onToggleKeyboard,
}) => {
  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl w-full max-w-[220px] select-none">
      <div className="flex items-center justify-between w-full mb-6">
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          Lightning Remote
        </span>
        <button
          type="button"
          onClick={onTogglePower}
          aria-label={isPoweredOn ? 'Turn TV off' : 'Turn TV on'}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm',
            isPoweredOn
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              : 'bg-slate-800 text-slate-500 hover:text-slate-300'
          )}
        >
          <Power className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* D-Pad Circular Controller */}
      <div className="relative w-36 h-36 rounded-full bg-slate-800/90 border border-slate-700/80 shadow-inner flex items-center justify-center my-2">
        <button
          type="button"
          onClick={() => onNavigate('up')}
          aria-label="Remote Up"
          className="absolute top-2 w-10 h-8 flex items-center justify-center text-slate-300 hover:text-white transition-transform active:scale-95"
        >
          <ChevronUp className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('down')}
          aria-label="Remote Down"
          className="absolute bottom-2 w-10 h-8 flex items-center justify-center text-slate-300 hover:text-white transition-transform active:scale-95"
        >
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('left')}
          aria-label="Remote Left"
          className="absolute left-2 w-8 h-10 flex items-center justify-center text-slate-300 hover:text-white transition-transform active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('right')}
          aria-label="Remote Right"
          className="absolute right-2 w-8 h-10 flex items-center justify-center text-slate-300 hover:text-white transition-transform active:scale-95"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onSelect}
          aria-label="Remote OK Select"
          className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white hover:border-primary transition-all shadow-md flex items-center justify-center active:scale-90"
        >
          OK
        </button>
      </div>

      <div className="mt-6 w-full flex items-center justify-center">
        <button
          type="button"
          onClick={onToggleKeyboard}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono transition-colors border',
            isKeyboardCapturing
              ? 'bg-primary/20 border-primary/40 text-primary'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
          )}
        >
          <Keyboard className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isKeyboardCapturing ? 'Arrow Keys Active' : 'Keys Paused'}</span>
        </button>
      </div>
    </div>
  );
};
