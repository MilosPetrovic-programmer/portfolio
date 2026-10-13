import React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: 'default' | 'surface' | 'outline';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-surface border border-border shadow-sm',
    surface: 'bg-surface/50 border border-border/60 backdrop-blur-sm',
    outline: 'border border-border/80 bg-transparent',
  };

  return (
    <div
      className={cn('rounded-xl p-6 transition-all duration-200', variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
