import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const FigmaVsSeerComparison: React.FC = () => {
  return (
    <div className="w-full bg-card border border-subtle rounded-3xl p-6 sm:p-8 select-none space-y-6 shadow-sm">
      <div className="border-b border-subtle pb-4">
        <h3 className="text-lg font-bold text-text-primary">
          Visual Comparison: Raw Figma Board vs. Seer Production Refinement
        </h3>
        <p className="text-xs text-text-secondary font-mono mt-0.5">
          Side-by-side analysis demonstrating fixes for mathematical errors and cognitive button confusion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Raw Figma Mock */}
        <div className="p-5 rounded-2xl bg-ground border border-signal-no/40 space-y-4 relative">
          <div className="flex items-center justify-between border-b border-subtle pb-2">
            <span className="text-xs font-mono font-bold text-signal-no uppercase flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Raw Figma Kit Mock (Node 118-16652)
            </span>
            <span className="text-[10px] font-mono text-signal-no bg-signal-no-soft px-2 py-0.5 rounded font-bold">
              Flawed UX &amp; Math
            </span>
          </div>

          {/* Mock Figma Card */}
          <div className="p-4 bg-card rounded-xl border border-subtle space-y-3 opacity-90">
            <div className="text-xs font-bold text-text-primary">
              Clarity Act (H.R.3633) signed into law in 2026?
            </div>

            <div className="space-y-2">
              {/* Bug callout: Yes 69¢ + No 37¢ = 106¢! */}
              <div className="p-3 bg-ground rounded-xl border border-signal-no flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-semibold">Binary Odds</span>
                  <div className="text-[10px] text-signal-no font-mono font-bold">
                    ⚠️ Odds sum to 106¢ ($1.06)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-ef-violet text-white text-xs rounded-lg font-mono font-bold">
                    Yes 69¢
                  </div>
                  <div className="px-3 py-1.5 bg-ef-violet text-white text-xs rounded-lg font-mono font-bold">
                    No 37¢
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-text-muted flex justify-between pt-1">
              <span>$2.1M Vol.</span>
              <span>Flat currency, no yield APY</span>
            </div>
          </div>

          <ul className="text-xs text-text-secondary space-y-1.5 list-disc pl-4">
            <li>Uniform purple buttons for both YES and NO create high-frequency mis-clicks.</li>
            <li>Sum of Yes (69¢) + No (37¢) = 106¢ violates foundational market probability axioms.</li>
            <li>No yield-bearing sDAI APY indicator; capital appears idle and unproductive.</li>
          </ul>
        </div>

        {/* Right: Seer Electric Foundation Refinement */}
        <div className="p-5 rounded-2xl bg-ground border border-signal-yes/40 space-y-4 relative">
          <div className="flex items-center justify-between border-b border-subtle pb-2">
            <span className="text-xs font-mono font-bold text-signal-yes uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Seer Electric Foundation Refinement
            </span>
            <span className="text-[10px] font-mono text-signal-yes bg-signal-yes-soft px-2 py-0.5 rounded font-bold">
              Production Standard
            </span>
          </div>

          {/* Refined Seer Card */}
          <div className="p-4 bg-card rounded-xl border border-subtle space-y-3 shadow-md">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-elevated text-text-muted uppercase">Politics</span>
              <span className="text-signal-yes font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-yes animate-live-pulse" />
                sDAI ~5.20% APY
              </span>
            </div>

            <div className="text-xs font-bold text-text-primary">
              Clarity Act (H.R.3633) signed into law in 2026?
            </div>

            <div className="space-y-2">
              {/* Invariant proof: 69¢ + 31¢ = 100¢! */}
              <div className="p-3 bg-ground rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border border-signal-yes/40">
                <div>
                  <span className="font-semibold">Binary Conserved Odds</span>
                  <div className="text-[10px] text-signal-yes font-mono font-bold">
                    ✓ P(Yes) + P(No) = 100.0¢ ($1.00)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-signal-yes text-black text-xs rounded-lg font-mono font-bold shadow-sm">
                    Yes 69¢
                  </div>
                  <div className="px-3 py-1.5 bg-signal-no text-white text-xs rounded-lg font-mono font-bold shadow-sm">
                    No 31¢
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-text-muted flex justify-between pt-1 border-t border-subtle">
              <span className="text-text-primary font-bold">$2.1M Vol.</span>
              <span className="text-ef-violet">Reality.eth + Kleros Court Backstop</span>
            </div>
          </div>

          <ul className="text-xs text-text-secondary space-y-1.5 list-disc pl-4">
            <li>Strict semantic colors (Emerald = YES, Coral = NO) eliminate cognitive misclicks.</li>
            <li>Strict mathematical probability conservation: all complementary outcomes sum to 100%.</li>
            <li>Embedded yield-bearing sDAI APY surfaces Seer's genuine protocol value proposition.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
