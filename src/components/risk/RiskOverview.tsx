import React from 'react';
import { ShieldAlert, TrendingUp, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const RiskOverview: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-card via-card to-ground border border-subtle p-6 sm:p-8">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-signal-warn/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-signal-warn-soft text-signal-warn border border-signal-warn/30">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Interface 6 • Cross-Protocol DeFi Tail-Risk Pricing Surface</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
          DeFi Tail-Risk Matrix: Loss Severity Ladders &times; Time Horizons
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
          Traditional DeFi insurance relies on discretionary claims assessors. <strong>Seer Risk Pricing</strong> transforms tail-risk into continuous, liquid prediction markets structured as discrete <strong>Loss Severity Ladders</strong> ($&gt;10\%$, $&gt;25\%$, $&gt;50\%$, $&gt;90\%$) across multiple time horizons. Capital is collateralized in yield-bearing sDAI, unlocking <strong>Net-Yield Positive Hedging</strong>.
        </p>

        {/* Highlight Value Proposition */}
        <div className="p-4 rounded-2xl bg-signal-yes-soft/70 border border-signal-yes/30 flex items-start gap-3 text-xs leading-relaxed">
          <TrendingUp className="w-5 h-5 text-signal-yes shrink-0 mt-0.5" />
          <div>
            <strong className="text-signal-yes font-bold">The Seer Net-Yield Positive Hedge (Departure #7):</strong>
            <span className="text-text-primary block mt-0.5">
              Because hedge collateral earns <strong>~5.20% base APY in sDAI</strong>, buying a catastrophic tail-risk hedge at 2.4% annual premium yields a <strong>net positive return of +2.80% APY</strong>. Treasuries protect against principal loss while still generating positive yield!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
