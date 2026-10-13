import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('combines multiple class names into a single string', () => {
    const result = cn('px-4', 'py-2', 'bg-primary');
    expect(result).toBe('px-4 py-2 bg-primary');
  });

  it('handles conditional class names cleanly', () => {
    const isPrimary = true;
    const isSecondary = false;
    const result = cn('btn', isPrimary && 'btn-primary', isSecondary && 'btn-secondary');
    expect(result).toBe('btn btn-primary');
  });

  it('merges and resolves conflicting Tailwind utility classes', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });
});
