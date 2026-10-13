import React from 'react';
import { cn } from '@/utils/cn';

export interface SectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly badge?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export const SectionShell: React.FC<SectionShellProps> = ({
  id,
  title,
  subtitle,
  badge,
  children,
  className,
}) => {
  return (
    <section id={id} className={cn('py-12 sm:py-16 scroll-mt-20', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          {badge ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20 mb-3">
              {badge}
            </div>
          ) : null}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-base text-muted-foreground max-w-3xl">
              {subtitle}
            </p>
          ) : null}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
};
