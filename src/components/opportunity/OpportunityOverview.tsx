import React from 'react';
import { Sparkles, Users, Layers, ShieldCheck, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';

export const OpportunityOverview: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-card via-card to-ground border border-subtle p-6 sm:p-8 space-y-6">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-ef-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-ef-violet-soft text-ef-violet border border-ef-violet/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interface 5 • Selection Forecasting &amp; Reviewer Triage Queue</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
          Opportunity Markets: Algorithmic Triage for Human Evaluators
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
          Ecosystem grant programs, hackathons, and accelerators receive hundreds of submissions. Instead of random evaluation, <strong>Opportunity Markets</strong> harnesses decentralized prediction odds to surface top candidates and sort the <strong>Reviewer Triage Queue</strong>. Market incentives bubble up high-signal projects, while accredited human committees make the final binding selections.
        </p>

        {/* Live Bounty Context Banner (Directly mirrors the Seer Rebrand Contest Part II rules!) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-ef-violet-soft via-ground to-card border border-ef-violet/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-ef-violet text-white flex items-center justify-center shrink-0 shadow-md">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-text-primary flex items-center gap-2">
                <span>Active Opportunity Market: Seer Rebrand Contest Part II</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-signal-yes text-black font-extrabold">0.5 ETH + $4,000 USDC</span>
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">
                Eligible designs are listed as outcomes. Market prices surface promising entries while the Seer team casts the final winning vote.
              </div>
            </div>
          </div>
          <div className="shrink-0 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-card border border-subtle text-signal-yes font-bold">
              Submissions Close: 23:59 UTC
            </span>
          </div>
        </div>

        {/* 3 Core Workflow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-ground/80 border border-subtle space-y-1">
            <span className="text-[10px] font-mono uppercase text-text-muted">Step 1</span>
            <div className="text-sm font-bold text-text-primary">Community Scouting</div>
            <p className="text-[11px] text-text-muted leading-snug">
              Scouts trade conditional shares on promising candidate repos using sDAI.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ground/80 border border-subtle space-y-1">
            <span className="text-[10px] font-mono uppercase text-ef-violet">Step 2</span>
            <div className="text-sm font-bold text-text-primary">Dynamic Triage Queue</div>
            <p className="text-[11px] text-text-muted leading-snug">
              Candidates are prioritized by implied probability and liquidity volume.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ground/80 border border-subtle space-y-1">
            <span className="text-[10px] font-mono uppercase text-signal-yes">Step 3</span>
            <div className="text-sm font-bold text-text-primary">Human Juror Selection</div>
            <p className="text-[11px] text-text-muted leading-snug">
              Accredited committees grade rubrics and finalize awards with zero reviewer burnout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};