import React, { useState } from 'react';
import { FutarchyProposal } from '../../types';
import { CheckCircle2, AlertCircle, ArrowUpRight, TrendingUp, Sparkles, ShieldCheck, Terminal } from 'lucide-react';
import { Sparkline } from '../charts/Sparkline';

interface ProposalCardProps {
  proposal: FutarchyProposal;
  onTradeBranch: (proposal: FutarchyProposal, branch: 'PASS' | 'FAIL') => void;
  onInspectZodiac: (proposal: FutarchyProposal) => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  onTradeBranch,
  onInspectZodiac
}) => {
  const isPassFavorable = proposal.metricDeltaPercent >= proposal.decisionThresholdPercent;

  return (
    <div className="bg-card border border-subtle hover:border-ef-violet/50 rounded-3xl p-6 transition-all duration-200 select-none space-y-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-ef-violet text-white">
            {proposal.code}
          </span>
          <span className="text-xs text-text-muted font-mono">{proposal.category}</span>
        </div>

        <div className="flex items-center gap-2">
          {isPassFavorable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-signal-yes-soft text-signal-yes border border-signal-yes/30">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-yes animate-live-pulse" />
              PASS FAVORABLE (+{proposal.metricDeltaPercent.toFixed(1)}% Δ)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-signal-no-soft text-signal-no border border-signal-no/30">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-no animate-live-pulse" />
              REJECT RECOMMENDED ({proposal.metricDeltaPercent.toFixed(1)}% Δ)
            </span>
          )}
        </div>
      </div>

      {/* Proposal Title */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-text-primary leading-snug">
          {proposal.title}
        </h3>
        <div className="text-xs text-text-muted mt-1 font-mono">
          Proposer: {proposal.proposer} • Volume: ${(proposal.volumeUsd / 1000).toFixed(0)}k sDAI
        </div>
      </div>

      {/* Target Metric KPI Banner */}
      <div className="p-3 bg-ground border border-subtle rounded-xl flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ef-violet" />
          <span className="text-text-secondary">Evaluation Metric:</span>
          <span className="text-text-primary font-bold">{proposal.metricName}</span>
        </div>
        <div className="text-text-muted hidden sm:inline">
          Threshold: {proposal.decisionThresholdPercent > 0 ? '+' : ''}{proposal.decisionThresholdPercent}%
        </div>
      </div>

      {/* DUAL CONDITIONAL BRANCHES (IF PASS vs IF FAIL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Branch 1: IF PASS */}
        <div className="p-4 rounded-2xl bg-ground border border-signal-yes/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-signal-yes uppercase px-2 py-0.5 rounded bg-signal-yes-soft">
              BRANCH A: IF PASS
            </span>
            <span className="text-xs font-mono font-bold text-signal-yes">
              {(proposal.passProbability * 100).toFixed(0)}% Odds
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl font-mono font-extrabold text-signal-yes">
              {proposal.metricSymbol === 'USD ($)' ? '$' : ''}{proposal.passForecast.toFixed(1)} {proposal.metricSymbol !== 'USD ($)' ? proposal.metricSymbol : ''}
            </div>
            <div className="text-[11px] font-mono text-text-muted">
              Forecasted KPI 60D Post-Execution
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Sparkline data={proposal.passHistory} width={90} height={22} color="var(--signal-yes)" />
            <button
              onClick={() => onTradeBranch(proposal, 'PASS')}
              className="py-1.5 px-3 rounded-lg text-xs font-mono font-bold bg-signal-yes text-black hover:brightness-110 transition-all active:scale-95"
            >
              Bet PASS
            </button>
          </div>
        </div>

        {/* Branch 2: IF FAIL */}
        <div className="p-4 rounded-2xl bg-ground border border-signal-no/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-signal-no uppercase px-2 py-0.5 rounded bg-signal-no-soft">
              BRANCH B: IF FAIL
            </span>
            <span className="text-xs font-mono font-bold text-signal-no">
              {(proposal.failProbability * 100).toFixed(0)}% Odds
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl font-mono font-extrabold text-signal-no">
              {proposal.metricSymbol === 'USD ($)' ? '$' : ''}{proposal.failForecast.toFixed(1)} {proposal.metricSymbol !== 'USD ($)' ? proposal.metricSymbol : ''}
            </div>
            <div className="text-[11px] font-mono text-text-muted">
              Forecasted KPI if Proposal is Rejected
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Sparkline data={proposal.failHistory} width={90} height={22} color="var(--signal-no)" />
            <button
              onClick={() => onTradeBranch(proposal, 'FAIL')}
              className="py-1.5 px-3 rounded-lg text-xs font-mono font-bold bg-signal-no text-white hover:brightness-110 transition-all active:scale-95"
            >
              Bet FAIL
            </button>
          </div>
        </div>
      </div>

      {/* Footer & Zodiac Calldata trigger */}
      <div className="pt-2 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <ShieldCheck className="w-4 h-4 text-signal-yes" />
          <span>Capital Protection: Unchosen branch receives 100% collateral refund.</span>
        </div>

        <button
          onClick={() => onInspectZodiac(proposal)}
          className="text-ef-violet hover:underline flex items-center gap-1 font-mono text-[11px]"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Inspect Zodiac Reality Calldata</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
