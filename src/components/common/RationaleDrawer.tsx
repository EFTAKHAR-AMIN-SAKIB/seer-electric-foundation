import React from 'react';
import { X, BookOpen, ExternalLink, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { SEER_7_DEPARTURES } from '../../data/departures';
import { PageRoute } from '../../types';

interface RationaleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFullPage: () => void;
}

export const RationaleDrawer: React.FC<RationaleDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToFullPage
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-full sm:h-full bg-card border-t sm:border-t-0 sm:border-l border-subtle rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-right duration-250 pb-[env(safe-area-inset-bottom)]">
        {/* Mobile Drag Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-subtle" />
        </div>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-subtle flex items-start justify-between bg-ground/50 sticky top-0 z-10 backdrop-blur-md shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-ef-violet-soft text-ef-violet border border-ef-violet/30 font-bold">
                Contest Part II Architectural Defense
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-ef-violet" />
              <span>7 Deliberate Design Departures</span>
            </h3>
            <p className="text-xs text-text-secondary">
              Defending our refinements to the Electric Foundation Figma Board node 118-16652
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 overflow-y-auto">
          <div className="p-4 rounded-xl bg-ef-violet-soft/60 border border-ef-violet/30 flex items-start gap-3">
            <Zap className="w-5 h-5 text-ef-violet shrink-0 mt-0.5" />
            <div className="text-xs text-text-primary leading-relaxed">
              <strong className="text-ef-violet font-semibold">Executive Summary for Judges:</strong> Rather than blindly copying raw static Figma artifacts containing impossible odds (e.g. 106% sum) and monochromatic action buttons, we engineered an institutional-grade, mathematically invariant Web3 prediction operating system that honors Seer's true protocol architecture.
            </div>
          </div>

          <div className="space-y-5">
            {SEER_7_DEPARTURES.map(dep => (
              <div
                key={dep.id}
                className="p-4 rounded-xl bg-ground border border-subtle hover:border-ef-violet/40 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-elevated border border-subtle text-ef-violet font-mono text-xs font-bold flex items-center justify-center">
                      {dep.number}
                    </span>
                    <h4 className="text-xs font-bold text-text-primary">
                      {dep.title}
                    </h4>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-ef-violet font-medium">
                  {dep.subtitle}
                </div>

                {/* Side-by-side comparison boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-card/60 border border-signal-no/20 text-text-secondary">
                    <span className="text-[10px] font-mono uppercase text-signal-no font-bold block mb-1">
                      Raw Figma Mock Flaw
                    </span>
                    <p className="text-[11px] leading-snug">{dep.figmaFlaw}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-card/60 border border-signal-yes/20 text-text-secondary">
                    <span className="text-[10px] font-mono uppercase text-signal-yes font-bold block mb-1">
                      Seer Production Solution
                    </span>
                    <p className="text-[11px] leading-snug">{dep.seerSolution}</p>
                  </div>
                </div>

                <div className="text-[11px] text-text-muted leading-relaxed pt-1 border-t border-subtle">
                  <span className="font-semibold text-text-secondary">Cognitive Science:</span> {dep.cognitiveRationale}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-subtle bg-ground/80 shrink-0 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onNavigateToFullPage();
            }}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider bg-ef-violet text-white hover:bg-ef-violet-hover shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Open Dedicated /rationale Route</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
