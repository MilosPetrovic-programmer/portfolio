import React from 'react';
import { FileText, Github, Linkedin, GraduationCap, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionShell } from '@/components/layout/SectionShell';
import { Button } from '@/components/common/Button';
import { EduSchedulerWidget } from '@/components/showcase/eduscheduler';
import { TVEmulatorWidget } from '@/components/showcase/tv-emulator';
import { ContactSection } from '@/components/layout/Contact';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28 bg-gradient-to-b from-background via-surface/40 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                <GraduationCap className="w-4 h-4" aria-hidden="true" />
                <span>Software Engineer (Master&apos;s Degree)</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
                Miloš Petrović
              </h1>

              <p className="mt-3 text-xl sm:text-2xl font-semibold text-primary/90">
                Senior Frontend Architect &amp; Systems Engineer
              </p>

              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Specialized in high-scale modern web applications (React 19 &amp; strict TypeScript),
                clean enterprise backend systems (PHP 8.x REST APIs), and hardware-constrained 10-foot
                Smart TV UI runtimes (LightningJS WebGL/Canvas2D 60 FPS engines).
              </p>

              {/* Direct Action Buttons: CV, GitHub, LinkedIn */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact">
                  <Button variant="primary" size="lg" className="gap-2 shadow-md">
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>Download CV</span>
                  </Button>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>GitHub</span>
                  </Button>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <Linkedin className="w-4 h-4 text-blue-500" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </Button>
                </a>

                <a href="#eduscheduler">
                  <Button variant="ghost" size="lg" className="gap-1.5 text-xs text-muted-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                    <span>View Live Showcases ↓</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase 1: EduScheduler */}
        <SectionShell
          id="eduscheduler"
          badge="Enterprise Showcase"
          title="EduScheduler: Resource Reservation Engine"
          subtitle="Complex interval tree conflict detection with optimistic UI updates and typed PHP 8.x REST backend integration."
        >
          <EduSchedulerWidget />
        </SectionShell>

        {/* Showcase 2: Smart TV LightningJS Emulator */}
        <SectionShell
          id="tv-emulator"
          badge="10-Foot UI Sandbox"
          title="Smart TV LightningJS Emulator"
          subtitle="Hardware-constrained 60 FPS WebGL/Canvas2D rendering under strict memory budgets (<512MB RAM) and D-Pad spatial navigation."
        >
          <TVEmulatorWidget />
        </SectionShell>

        {/* Contact Section */}
        <SectionShell
          id="contact"
          badge="Get in Touch"
          title="Direct Contact &amp; Opportunities"
          subtitle="Reach out directly for senior engineering collaboration, technical leadership, and system design."
        >
          <ContactSection />
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
};
