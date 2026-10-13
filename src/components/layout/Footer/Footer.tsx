import React from 'react';
import { Mail, Github, Linkedin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border/60 bg-surface/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="font-bold text-foreground text-sm">
            Miloš Petrović — Software Engineer (Master&apos;s Degree)
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            Zero-`any` Architecture • High-Scale Systems &amp; Embedded 10-Foot UI
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a
            href="mailto:milos.petrovic.programer@gmail.com"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>milos.petrovic.programer@gmail.com</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
