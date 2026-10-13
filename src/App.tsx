import React from 'react';
import { Layers, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionShell } from '@/components/layout/SectionShell';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { EduSchedulerPlaceholder } from '@/components/showcase/eduscheduler';
import { TVEmulatorPlaceholder } from '@/components/showcase/tv-emulator';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-24 bg-gradient-to-b from-background via-surface/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Production Architecture Portfolio</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Senior Frontend Architect &amp; Systems Engineer
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Bridging high-scale modern web applications with React 19 &amp; strict TypeScript,
                enterprise PHP backend systems, and high-performance 10-foot Smart TV UI with LightningJS.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#eduscheduler">
                  <Button variant="primary" size="lg">
                    Explore Showcases
                  </Button>
                </a>
                <a href="#architecture">
                  <Button variant="outline" size="lg">
                    System Architecture
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EduScheduler Showcase */}
        <SectionShell
          id="eduscheduler"
          badge="Enterprise Showcase"
          title="EduScheduler: Resource Reservation Engine"
          subtitle="Complex interval tree conflict detection with optimistic updates and typed PHP 8.x REST backend integration."
        >
          <EduSchedulerPlaceholder />
        </SectionShell>

        {/* Smart TV Showcase */}
        <SectionShell
          id="tv-emulator"
          badge="10-Foot UI Sandbox"
          title="Smart TV LightningJS Emulator"
          subtitle="High-performance WebGL/Canvas2D 60 FPS rendering under constrained hardware budgets (<512MB RAM) and D-Pad spatial navigation."
        >
          <TVEmulatorPlaceholder />
        </SectionShell>

        {/* Architecture Principles */}
        <SectionShell
          id="architecture"
          badge="Engineering Standards"
          title="Architectural Foundations"
          subtitle="Strict adherence to non-negotiable engineering principles defined in our architectural dossier."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="surface">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground">Zero Any Policy</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                100% strict TypeScript typing. Discriminated unions for state, branded identifiers,
                and runtime Zod schema parsing for all external data.
              </p>
            </Card>

            <Card variant="surface">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground">3-Tier Separation</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pure presentation in UI components, reactive orchestration in custom hooks,
                and zero-React transport and algorithms in services.
              </p>
            </Card>

            <Card variant="surface">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground">Hard Performance Budgets</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sub-120KB gzipped core bundle, strict 60 FPS frame budgets, texture memory recycling,
                and sub-second cold starts.
              </p>
            </Card>
          </div>
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
};
