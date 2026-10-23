import React from 'react';
import { TokenShowcase } from '../components/rationale/TokenShowcase';
import { FigmaVsSeerComparison } from '../components/rationale/FigmaVsSeerComparison';
import { ContrastChecker } from '../components/rationale/ContrastChecker';
import { PoidhSubmissionHelper } from '../components/rationale/PoidhSubmissionHelper';
import { SEER_7_DEPARTURES } from '../data/departures';
import { BookOpen, ShieldCheck, Zap, ArrowRight, CheckCircle2, Code } from 'lucide-react';

export const RationalePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-10">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-card via-card to-ground border border-subtle p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-ef-violet-soft text-ef-violet border border-ef-violet/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Contest Part II • Electric Foundation Architectural Dossier</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
          Design Rationale: 7 Deliberate Departures
        </h1>

        <p className="max-w-3xl text-sm sm:text-base text-text-secondary leading-relaxed">
          The Seer Rebrand Contest Part II challenges architects to embody the <strong>Electric Foundation</strong> design language while shipping an institutional-grade protocol experience. Rather than mechanically copying static Figma artifacts with broken probabilities and uniform action colors, we engineered seven mathematically grounded, cognitive-science-defended departures.
        </p>
      </div>

      {/* 0. Ready-to-Paste Poidh Claim Dossier Generator */}
      <PoidhSubmissionHelper />

      {/* 1. Visual Comparison (Figma vs Seer) */}
      <FigmaVsSeerComparison />

      {/* 2. Token Showcase */}
      <TokenShowcase />

      {/* 3. Accessibility & Contrast Checker */}
      <ContrastChecker />

      {/* 4. The 7 Detailed Departures Cards */}
      <div className="space-y-6">
        <div className="border-b border-subtle pb-4">
          <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">
            Comprehensive Defense of the 7 UX Departures
          </h2>
          <p className="text-xs text-text-secondary font-mono mt-0.5">
            Defended across cognitive neuroscience, market micro-structure, and Ethereum smart contract mechanics
          </p>
        </div>

        <div className="space-y-6">
          {SEER_7_DEPARTURES.map(dep => (
            <div
              key={dep.id}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-subtle hover:border-ef-violet/40 transition-colors space-y-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-ef-violet-soft border border-ef-violet/30 text-ef-violet font-mono text-sm font-bold flex items-center justify-center">
                    {dep.number}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-text-primary">
                      {dep.title}
                    </h3>
                    <div className="text-xs font-mono text-ef-violet mt-0.5">
                      {dep.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                  {dep.tokensUsed.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-ground border border-subtle text-text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Side-by-side flaw vs solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-ground border border-signal-no/25 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-signal-no uppercase">
                    <span>Raw Figma Flaw / Inadequacy:</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {dep.figmaFlaw}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-ground border border-signal-yes/25 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-signal-yes uppercase">
                    <span>Seer Production Solution:</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {dep.seerSolution}
                  </p>
                </div>
              </div>

              {/* Cognitive & Protocol Invariants */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-4 rounded-2xl bg-ground border border-subtle space-y-1.5">
                  <div className="font-mono font-bold text-text-primary uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-ef-violet" />
                    <span>Cognitive Neuroscience &amp; UI Grounding:</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {dep.cognitiveArgument}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-ground border border-subtle space-y-1.5">
                  <div className="font-mono font-bold text-text-primary uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-signal-yes" />
                    <span>Seer Protocol &amp; Smart Contract Invariant:</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-mono text-[11px]">
                    {dep.protocolInvariant}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};