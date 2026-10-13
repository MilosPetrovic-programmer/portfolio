import React from 'react';
import { Clock, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { ReservationSlot } from '@/types/eduscheduler';

export interface TimeSlotGridProps {
  readonly reservations: readonly ReservationSlot[];
  readonly selectedStartHour: number;
  readonly selectedEndHour: number;
  readonly onSelectSlot: (start: number, end: number) => void;
}

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] as const;

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  reservations,
  selectedStartHour,
  selectedEndHour,
  onSelectSlot,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
        <span className="flex items-center gap-1 font-medium">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          Classroom Schedule Grid (08:00 - 18:00)
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-primary/20 border border-primary" />
            Selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/50" />
            Reserved
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
        {HOURS.map((hour) => {
          const booking = reservations.find(
            (r) => hour >= r.startHour && hour < r.endHour
          );
          const isSelected = hour >= selectedStartHour && hour < selectedEndHour;

          const isBooked = Boolean(booking);

          const handleClick = (): void => {
            if (!isBooked) {
              onSelectSlot(hour, hour + 2);
            }
          };

          return (
            <button
              key={hour}
              disabled={isBooked}
              onClick={handleClick}
              className={cn(
                'flex flex-col items-start p-2 rounded-lg border text-left transition-all duration-150 min-h-[82px]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isBooked
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-500 cursor-not-allowed'
                  : isSelected
                    ? 'border-primary bg-primary/15 shadow-sm text-primary ring-1 ring-primary/40'
                    : 'border-border/60 bg-surface/50 hover:bg-surface hover:border-primary/50 text-foreground cursor-pointer'
              )}
            >
              <div className="flex items-center justify-between w-full text-[11px] font-mono font-semibold">
                <span>{`${hour.toString().padStart(2, '0')}:00`}</span>
                <span className="text-[10px] opacity-70">1h</span>
              </div>

              {booking ? (
                <div className="mt-1.5 text-[11px] leading-tight flex flex-col justify-between flex-1">
                  <span className="font-semibold line-clamp-2 text-foreground">
                    {booking.title}
                  </span>
                  <span className="text-[10px] opacity-80 mt-1 flex items-center gap-0.5 truncate text-muted-foreground">
                    <User className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
                    {booking.professorName}
                  </span>
                </div>
              ) : isSelected ? (
                <div className="mt-1.5 text-[11px] text-primary font-medium">
                  <span>Selected Window</span>
                </div>
              ) : (
                <div className="mt-1.5 text-[11px] text-muted-foreground">
                  <span className="text-emerald-500 text-[10px] font-medium">Clear Slot</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
