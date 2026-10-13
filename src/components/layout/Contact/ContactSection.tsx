import React, { useState } from 'react';
import { Mail, Check, Copy, Github, Linkedin, Send, Sparkles } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export const ContactSection: React.FC = () => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const email = 'milos.petrovic.programer@gmail.com';

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(email);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      // Graceful fallback
    }
  };

  return (
    <Card variant="surface" className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 border-border/80">
      <div className="flex flex-col gap-3 max-w-xl text-center md:text-left">
        <div className="inline-flex items-center gap-2 self-center md:self-start px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Open to Senior Engineering &amp; Architect Roles</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Let&apos;s Build Resilient Systems Together
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Whether discussing high-scale frontend architecture in React 19, enterprise PHP REST systems,
          or embedded 60fps TV runtimes, my inbox is always open.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>GitHub Profile</span>
          </a>
          <span className="text-muted-foreground/40">•</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span>LinkedIn Network</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full md:w-auto shrink-0">
        <div className="flex items-center gap-2 p-2 rounded-xl border border-border bg-background w-full sm:w-auto shadow-inner">
          <Mail className="w-4 h-4 text-primary ml-2 shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-mono text-foreground select-all px-2">
            {email}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label="Copy email address"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground ml-auto"
          >
            {hasCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className="flex gap-2 w-full">
          <a href={`mailto:${email}`} className="flex-1">
            <Button variant="primary" size="md" className="w-full gap-2 text-xs">
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Send Email</span>
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};
