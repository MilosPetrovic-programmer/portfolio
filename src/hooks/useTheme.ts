import { useState, useEffect, useCallback } from 'react';
import type { ThemeMode } from '@/types/system';

export interface UseThemeReturn {
  readonly theme: ThemeMode;
  readonly isDark: boolean;
  readonly setTheme: (theme: ThemeMode) => void;
  readonly toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('theme-mode');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'dark';
  });

  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const root = document.documentElement;
    const hasMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
    const mediaQuery = hasMatchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    const resolveDark = (): boolean => {
      if (theme === 'system') {
        return mediaQuery ? mediaQuery.matches : true;
      }
      return theme === 'dark';
    };

    const appliedDark = resolveDark();
    setIsDark(appliedDark);

    if (appliedDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem('theme-mode', theme);
    } catch {
      // Graceful fallback if localStorage is disabled or restricted
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeMode): void => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback((): void => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
