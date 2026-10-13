import React from 'react';
import { Play, Sparkles, Tv } from 'lucide-react';
import { cn } from '@/utils/cn';
import type {
  MediaRow,
  MediaItem,
  TVFocusCoordinates,
} from '@/types/smart-tv';

export interface TVScreenProps {
  readonly isPoweredOn: boolean;
  readonly catalog: readonly MediaRow[];
  readonly focusCoords: TVFocusCoordinates;
  readonly activeMedia: MediaItem;
  readonly notification: string | null;
  readonly onCardClick: (rowIndex: number, colIndex: number) => void;
}

export const TVScreen: React.FC<TVScreenProps> = ({
  isPoweredOn,
  catalog,
  focusCoords,
  activeMedia,
  notification,
  onCardClick,
}) => {
  if (!isPoweredOn) {
    return (
      <div className="w-full aspect-video min-h-[320px] max-h-[460px] bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-slate-600 gap-3 border border-slate-800 shadow-2xl">
        <Tv className="w-12 h-12 opacity-40" aria-hidden="true" />
        <span className="text-xs font-mono tracking-widest uppercase">
          Display in Standby • Press Power to Resume
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video min-h-[340px] max-h-[460px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl flex flex-col select-none">
      {/* Dynamic Active Hero Banner */}
      <div
        className={cn(
          'relative w-full h-44 p-6 flex flex-col justify-end bg-gradient-to-r transition-all duration-300',
          activeMedia.accentColor
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative z-10 flex flex-col gap-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-md">
              {activeMedia.badge ?? 'PREMIERE'}
            </span>
            <span className="text-xs font-medium text-white/80">
              {activeMedia.category} • {activeMedia.year} • {activeMedia.duration}
            </span>
            <span className="text-xs font-bold text-amber-300">
              {activeMedia.rating}
            </span>
          </div>
          <h4 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
            {activeMedia.title}
          </h4>
        </div>

        {notification ? (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/90 text-white text-xs font-medium shadow-lg animate-in fade-in duration-150">
            <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            <span>{notification}</span>
          </div>
        ) : null}
      </div>

      {/* Media Catalog Carousels */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950">
        {catalog.map((row, rIndex) => (
          <div key={row.id} className="space-y-2">
            <h5 className="text-xs font-bold tracking-wide text-slate-400 uppercase">
              {row.title}
            </h5>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {row.items.map((item, cIndex) => {
                const isFocused =
                  focusCoords.rowIndex === rIndex && focusCoords.colIndex === cIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onCardClick(rIndex, cIndex)}
                    className={cn(
                      'relative shrink-0 w-44 h-24 rounded-xl p-3 text-left flex flex-col justify-between transition-all duration-200 outline-none cursor-pointer',
                      isFocused
                        ? 'scale-105 ring-2 ring-primary bg-slate-800 shadow-xl shadow-primary/20 z-10'
                        : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 opacity-80'
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {item.category}
                      </span>
                      {isFocused ? (
                        <Sparkles className="w-3 h-3 text-primary animate-pulse" aria-hidden="true" />
                      ) : null}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {item.duration} • {item.rating}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
