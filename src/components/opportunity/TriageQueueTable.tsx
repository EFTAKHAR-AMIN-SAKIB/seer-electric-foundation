import React from 'react';
import { OpportunitySubmission } from '../../types';
import { ArrowUpRight, ExternalLink, CheckCircle2, Clock, Sparkles, Sliders } from 'lucide-react';

interface TriageQueueTableProps {
  submissions: OpportunitySubmission[];
  onOpenRubric: (sub: OpportunitySubmission) => void;
  onOpenScoutStake: (sub: OpportunitySubmission) => void;
}

export const TriageQueueTable: React.FC<TriageQueueTableProps> = ({
  submissions,
  onOpenRubric,
  onOpenScoutStake
}) => {
  const getStatusColor = (status: OpportunitySubmission['triageStatus']) => {
    switch (status) {
      case 'Selected':
        return 'bg-signal-yes-soft text-signal-yes border-signal-yes/30';
      case 'Interview Scheduled':
        return 'bg-signal-cyan-soft text-signal-cyan border-signal-cyan/30';
      case 'In Committee Triage':
        return 'bg-ef-violet-soft text-ef-violet border-ef-violet/30';
      case 'Awaiting Review':
        return 'bg-elevated text-text-muted border-subtle';
      case 'Rejected':
        return 'bg-signal-no-soft text-signal-no border-signal-no/30';
    }
  };

  return (
    <div className="w-full bg-card border border-subtle rounded-3xl overflow-hidden shadow-sm select-none">
      <div className="p-5 border-b border-subtle flex flex-wrap items-center justify-between gap-3 bg-ground/50">
        <div>
          <h3 className="text-base font-bold text-text-primary">
            Reviewer Triage Queue (Sorted by Market Odds)
          </h3>
          <p className="text-xs text-text-secondary mt-0.5 font-mono">
            Sybil-resistant selection pipeline • Strict conservation Σ P(Candidate) = 100.0%
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-text-muted">Total Cohort Probability:</span>
          <span className="font-bold text-signal-yes">
            {submissions.reduce((acc, s) => acc + s.marketProbability, 0)}% ($1.00)
          </span>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="sm:hidden px-4 py-2 bg-ground text-[10px] font-mono text-text-muted flex items-center justify-between border-b border-subtle">
        <span>← Swipe horizontally for triage metrics →</span>
        <span className="text-ef-violet font-bold">Tap row for rubric</span>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-subtle bg-ground/80 text-[11px] uppercase text-text-muted">
              <th className="py-3 px-4 font-semibold w-16">Priority</th>
              <th className="py-3 px-4 font-semibold min-w-[260px]">Submission &amp; Track</th>
              <th className="py-3 px-4 font-semibold min-w-[160px]">Market Implied Odds</th>
              <th className="py-3 px-4 font-semibold">Triage Status</th>
              <th className="py-3 px-4 font-semibold">Scout Liquidity</th>
              <th className="py-3 px-4 font-semibold text-right">Committee Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle font-sans">
            {submissions.map((sub, idx) => (
              <tr
                key={sub.id}
                className="hover:bg-elevated/70 transition-colors group"
              >
                {/* Priority Rank */}
                <td className="py-4 px-4 whitespace-nowrap font-mono">
                  <div className="w-8 h-8 rounded-xl bg-elevated border border-subtle text-ef-violet font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </div>
                  <div className="text-[10px] text-text-muted text-center mt-0.5">
                    {sub.triagePriorityScore}/100
                  </div>
                </td>

                {/* Submission Title, Track & Repo */}
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-ef-violet-soft text-ef-violet border border-ef-violet/20 font-bold">
                        {sub.track}
                      </span>
                      <a
                        href={sub.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-text-muted hover:text-text-primary flex items-center gap-1"
                      >
                        <span>{sub.team}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-sm font-bold text-text-primary leading-snug group-hover:text-ef-violet transition-colors">
                      {sub.title}
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-1">
                      {sub.summary}
                    </p>
                  </div>
                </td>

                {/* Market Implied Odds (Normalized) */}
                <td className="py-4 px-4 whitespace-nowrap font-mono">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-signal-yes text-sm">
                        {sub.marketProbability}%
                      </span>
                      <span className="text-text-muted text-[11px]">
                        ${(sub.marketProbability / 100).toFixed(2)} / token
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-ground rounded-full overflow-hidden">
                      <div
                        className="h-full bg-signal-yes transition-all duration-300"
                        style={{ width: `${sub.marketProbability}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${getStatusColor(sub.triageStatus)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {sub.triageStatus}
                  </span>
                </td>

                {/* Scout Liquidity */}
                <td className="py-4 px-4 whitespace-nowrap font-mono text-xs">
                  <div className="font-bold text-text-primary">
                    ${(sub.scoutVolumeUsd / 1000).toFixed(0)}k sDAI
                  </div>
                  <div className="text-[10px] text-text-muted">
                    Liq: ${(sub.liquidityUsd / 1000).toFixed(0)}k
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onOpenRubric(sub)}
                      className="py-1.5 px-3 rounded-xl text-xs font-semibold bg-elevated hover:bg-ground border border-subtle text-text-primary transition-colors flex items-center gap-1.5"
                    >
                      <Sliders className="w-3.5 h-3.5 text-ef-violet" />
                      <span>Rubric</span>
                    </button>

                    <button
                      onClick={() => onOpenScoutStake(sub)}
                      className="py-1.5 px-3 rounded-xl text-xs font-mono font-bold bg-signal-yes text-black hover:brightness-110 transition-transform active:scale-95 shadow-sm"
                    >
                      Stake {sub.marketProbability}¢
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
