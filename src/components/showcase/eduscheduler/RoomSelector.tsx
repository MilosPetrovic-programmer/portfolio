import React from 'react';
import { Users, Building2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Classroom, RoomId } from '@/types/eduscheduler';

export interface RoomSelectorProps {
  readonly classrooms: readonly Classroom[];
  readonly selectedRoomId: RoomId;
  readonly onSelectRoom: (id: RoomId) => void;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({
  classrooms,
  selectedRoomId,
  onSelectRoom,
}) => {
  return (
    <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Classroom selection">
      {classrooms.map((room) => {
        const isSelected = room.id === selectedRoomId;
        return (
          <button
            key={room.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectRoom(room.id)}
            className={cn(
              'flex flex-col text-left px-3.5 py-2.5 rounded-lg border transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isSelected
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border/70 bg-surface hover:bg-surface-hover text-muted-foreground'
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  'font-semibold text-sm',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}
              >
                {room.name}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono opacity-80">
                <Users className="w-3 h-3" aria-hidden="true" />
                {room.capacity}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Building2 className="w-3 h-3" aria-hidden="true" />
              <span>{room.building}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
