import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border/60 bg-surface/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          <span>Senior Frontend Architect & Systems Engineer Portfolio</span>
          <span className="mx-2">•</span>
          <span>Zero-Any Architecture</span>
        </div>
        <div className="flex items-center gap-4">
          <span>React 19</span>
          <span>TypeScript Strict</span>
          <span>Tailwind CSS</span>
          <span>Vitest</span>
        </div>
      </div>
    </footer>
  );
};
