import React from 'react';
import { Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/common/Card';

export const EduSchedulerPlaceholder: React.FC = () => {
  return (
    <Card variant="surface" className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
          <h3 className="font-semibold text-foreground text-lg">
            EduScheduler Enterprise Engine
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          Ready for Feature Implementation
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Enterprise resource booking engine with client-side interval tree conflict detection,
        optimistic UI updates, and typed PHP 8.x REST API simulation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span>Interval conflict engine initialized (`checkIntervalOverlap`)</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span>Strict RBAC and optimistic rollback contracts prepared</span>
        </div>
      </div>
    </Card>
  );
};
