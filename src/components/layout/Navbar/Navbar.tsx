import React from 'react';
import { Sun, Moon, Terminal, Cpu, Mail } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useTheme } from '@/hooks/useTheme';

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm transition-transform group-hover:scale-105">
            <Terminal className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-bold text-foreground tracking-tight text-base sm:text-lg block sm:inline">
              Miloš Petrović
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-muted-foreground border border-border/80 rounded px-1.5 py-0.5">
              Software Engineer (Master&apos;s Degree)
            </span>
          </div>
        </a>

        <nav className="flex items-center gap-1.5 sm:gap-3">
          <a
            href="#eduscheduler"
            className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md"
          >
            EduScheduler
          </a>
          <a
            href="#tv-emulator"
            className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md flex items-center gap-1"
          >
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Smart TV</span>
          </a>
          <a
            href="#contact"
            className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Contact</span>
          </a>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="ml-1 w-9 h-9 p-0 rounded-lg text-muted-foreground hover:text-foreground"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" aria-hidden="true" />
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
};
