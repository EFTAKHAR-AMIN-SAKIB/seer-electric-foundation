import React, { useState, useMemo } from 'react';
import { OpportunityOverview } from '../components/opportunity/OpportunityOverview';
import { TriageQueueTable } from '../components/opportunity/TriageQueueTable';
import { ReviewerRubricModal } from '../components/opportunity/ReviewerRubricModal';
import { ScoutStakeWidget } from '../components/opportunity/ScoutStakeWidget';
import { MOCK_OPPORTUNITY_SUBMISSIONS } from '../data/mockOpportunity';
import { OpportunitySubmission } from '../types';

export const OpportunityPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<OpportunitySubmission[]>(MOCK_OPPORTUNITY_SUBMISSIONS);
  const [activeTrack, setActiveTrack] = useState<string>('All');
  const [rubricSubmission, setRubricSubmission] = useState<OpportunitySubmission | null>(null);
  const [scoutSubmission, setScoutSubmission] = useState<OpportunitySubmission | null>(null);

  const tracks = ['All', 'Infra', 'DeFi', 'AI & Agents', 'Privacy'];

  const filtered = useMemo(() => {
    if (activeTrack === 'All') return submissions;
    return submissions.filter(s => s.track === activeTrack);
  }, [submissions, activeTrack]);

  const handleUpdateSubmission = (updated: OpportunitySubmission) => {
    setSubmissions(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-8">
      {/* Intro Overview */}
      <OpportunityOverview />

      {/* Filter Track Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-text-primary tracking-tight">
          Live Opportunity Cohort Triage
        </h2>

        <div className="flex items-center gap-1.5 p-1 bg-card border border-subtle rounded-xl font-mono text-xs overflow-x-auto no-scrollbar max-w-full">
          {tracks.map(t => (
            <button
              key={t}
              onClick={() => setActiveTrack(t)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTrack === t ? 'bg-ef-violet text-white font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Triage Queue Table */}
      <TriageQueueTable
        submissions={filtered}
        onOpenRubric={setRubricSubmission}
        onOpenScoutStake={setScoutSubmission}
      />

      {/* Reviewer Rubric Modal */}
      {rubricSubmission && (
        <ReviewerRubricModal
          submission={rubricSubmission}
          onClose={() => setRubricSubmission(null)}
          onUpdateSubmission={handleUpdateSubmission}
        />
      )}

      {/* Scout Stake Modal */}
      {scoutSubmission && (
        <ScoutStakeWidget
          submission={scoutSubmission}
          onClose={() => setScoutSubmission(null)}
        />
      )}
    </div>
  );
};
