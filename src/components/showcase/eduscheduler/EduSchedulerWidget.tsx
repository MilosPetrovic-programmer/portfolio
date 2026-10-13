import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, RotateCcw, CalendarPlus, Zap } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useEduScheduler } from '@/hooks/useEduScheduler';
import { RoomSelector } from './RoomSelector';
import { TimeSlotGrid } from './TimeSlotGrid';
import { ConflictBanner } from './ConflictBanner';

export const EduSchedulerWidget: React.FC = () => {
  const {
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
  } = useEduScheduler();

  const [courseTitle, setCourseTitle] = useState<string>('Advanced Systems Architecture');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleBook = async (): Promise<void> => {
    setSuccessMessage(null);
    const ok = await bookSlot(courseTitle, 'Miloš Petrović');
    if (ok) {
      setSuccessMessage(
        `Successfully booked ${selectedRoom.name} for ${selectedStartHour}:00 - ${selectedEndHour}:00!`
      );
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  return (
    <Card variant="surface" className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-xl">EduScheduler Interactive Grid</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              Live Simulation
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Simulates PHP 8.x REST API transactions, sub-millisecond interval collision math, and optimistic rollback.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetSchedule} className="text-xs gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset Schedule
          </Button>
        </div>
      </div>

      <RoomSelector
        classrooms={classrooms}
        selectedRoomId={selectedRoom.id}
        onSelectRoom={setSelectedRoomId}
      />

      {conflictError ? (
        <ConflictBanner
          message={conflictError.message}
          conflictingTitle={conflictError.title}
          onDismiss={dismissConflict}
        />
      ) : null}

      {successMessage ? (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{successMessage}</span>
        </div>
      ) : null}

      <TimeSlotGrid
        reservations={reservations}
        selectedStartHour={selectedStartHour}
        selectedEndHour={selectedEndHour}
        onSelectSlot={setSelectedHours}
      />

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 border-t border-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="course-title" className="text-xs font-medium text-muted-foreground">
              Course Title:
            </label>
            <input
              id="course-title"
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="h-9 px-3 text-sm rounded-lg border border-border bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <button
            type="button"
            onClick={toggleSimulateConflict}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all ${
              isSimulatingConflict
                ? 'bg-destructive/15 border-destructive/40 text-destructive font-semibold'
                : 'bg-surface border-border text-muted-foreground hover:bg-surface-hover'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
            Simulate 409 Conflict Collision
          </button>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <div className="text-xs text-muted-foreground text-right hidden sm:block">
            Target Slot: <strong className="text-foreground">{`${selectedStartHour}:00 - ${selectedEndHour}:00`}</strong>
          </div>
          <Button
            variant="primary"
            size="md"
            isLoading={isPending}
            onClick={handleBook}
            className="gap-2"
          >
            {isPending ? (
              <Zap className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <CalendarPlus className="w-4 h-4" aria-hidden="true" />
            )}
            Book Classroom Slot
          </Button>
        </div>
      </div>
    </Card>
  );
};
