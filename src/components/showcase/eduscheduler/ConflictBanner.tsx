import React from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';

export interface ConflictBannerProps {
  readonly message: string;
  readonly conflictingTitle: string;
  readonly onDismiss: () => void;
}

export const ConflictBanner: React.FC<ConflictBannerProps> = ({
  message,
  conflictingTitle,
  onDismiss,
}) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="flex items-start justify-between gap-3 p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex flex-col text-sm">
          <span className="font-semibold">{message}</span>
          <span className="text-xs opacity-90 mt-0.5">
            Conflicting event: <strong>{conflictingTitle}</strong>
          </span>
          <span className="text-[11px] opacity-80 mt-1 flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" aria-hidden="true" />
            Optimistic UI rollback executed. Classroom state restored to authoritative snapshot.
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss conflict warning"
        className="p-1 rounded hover:bg-destructive/20 text-destructive transition-colors"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};
