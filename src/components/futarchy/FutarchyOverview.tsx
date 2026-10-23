import React from 'react';
import { Vote, ShieldCheck, ArrowRight, TrendingUp, RefreshCw, Zap } from 'lucide-react';

export const FutarchyOverview: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-card via-card to-ground border border-subtle p-6 sm:p-8">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-signal-yes/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-signal-yes-soft text-signal-yes border border-signal-yes/30">
          <Vote className="w-3.5 h-3.5" />
          <span>Interface 4 • Conditional Governance Decision Protocol</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
          Futarchy: Vote on Values, Bet on Beliefs
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
          DAOs frequently suffer from political lobbying and low voter participation. <strong>Seer Futarchy</strong> replaces speculative rhetoric with dual-branch counterfactual prediction markets: <strong>IF PASS</strong> vs. <strong>IF FAIL</strong>. If the predicted metric delta $\Delta$ exceeds the governance threshold, proposals execute autonomously via the Zodiac Reality Safe module.
        </p>

        {/* Highlight Banner: Departure #6 - Capital Protection Invariant */}
        <div className="p-4 rounded-2xl bg-ef-violet-soft/70 border border-ef-violet/30 flex items-start gap-3 text-xs leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-ef-violet shrink-0 mt-0.5" />
          <div>
            <strong className="text-ef-violet font-semibold">The Capital Protection Invariant (Departure #6):</strong>
            <span className="text-text-primary block mt-0.5">
              In standard betting, if an event doesn't occur, money is trapped. In Seer Futarchy, <strong>all bets on the unchosen branch are 100% refunded 1:1</strong>. If a proposal fails, PASS trades are voided and principal collateral is returned to your wallet. You only risk capital on the branch the DAO actually enacts!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
