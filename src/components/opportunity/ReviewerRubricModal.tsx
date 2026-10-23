import React, { useState } from 'react';
import { X, Check, Sliders, ShieldCheck, Sparkles } from 'lucide-react';
import { OpportunitySubmission } from '../../types';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';

interface ReviewerRubricModalProps {
  submission: OpportunitySubmission | null;
  onClose: () => void;
  onUpdateSubmission: (updated: OpportunitySubmission) => void;
}

export const ReviewerRubricModal: React.FC<ReviewerRubricModalProps> = ({
  submission,
  onClose,
  onUpdateSubmission
}) => {
  const { showToast } = useWallet();
  const { playChime } = useSound();

  const [techScore, setTechScore] = useState<number>(submission?.technicalScore ?? 8.5);
  const [feasibilityScore, setFeasibilityScore] = useState<number>(submission?.feasibilityScore ?? 8.0);
  const [impactScore, setImpactScore] = useState<number>(submission?.impactScore ?? 9.0);
  const [status, setStatus] = useState<OpportunitySubmission['triageStatus']>(
    submission?.triageStatus ?? 'In Committee Triage'
  );
  const [notes, setNotes] = useState<string>('Strong technical architecture, verified unit test suite.');

  if (!submission) return null;

  const compositeScore = ((techScore + feasibilityScore + impactScore) / 3).toFixed(1);

  const handleSave = () => {
    onUpdateSubmission({
      ...submission,
      technicalScore: techScore,
      feasibilityScore,
      impactScore,
      triageStatus: status
    });
    playChime('success');
    showToast(
      'Reviewer Rubric Saved',
      `Graded "${submission.title}" with composite score ${compositeScore}/10. Status updated to ${status}.`,
      'success'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card border border-subtle rounded-3xl p-6 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-ef-violet-soft text-ef-violet font-bold">
              {submission.track}
            </span>
            <span className="text-xs font-mono text-signal-yes font-bold">
              Market Odds: {submission.marketProbability}%
            </span>
          </div>
          <h3 className="text-base font-bold text-text-primary leading-snug">
            Accredited Committee Review Rubric
          </h3>
          <p className="text-xs text-text-secondary line-clamp-1">{submission.title}</p>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-3.5 pt-2">
          {/* Tech Innovation */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">1. Technical Innovation &amp; Novelty:</span>
              <span className="font-bold text-ef-violet">{techScore.toFixed(1)} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={techScore}
              onChange={e => setTechScore(parseFloat(e.target.value))}
              className="w-full accent-ef-violet cursor-pointer h-2 bg-ground rounded-lg"
            />
          </div>

          {/* Feasibility */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">2. Implementation Feasibility &amp; Tests:</span>
              <span className="font-bold text-signal-cyan">{feasibilityScore.toFixed(1)} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={feasibilityScore}
              onChange={e => setFeasibilityScore(parseFloat(e.target.value))}
              className="w-full accent-signal-cyan cursor-pointer h-2 bg-ground rounded-lg"
            />
          </div>

          {/* Impact */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">3. Ecosystem Impact &amp; Adoption:</span>
              <span className="font-bold text-signal-yes">{impactScore.toFixed(1)} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={impactScore}
              onChange={e => setImpactScore(parseFloat(e.target.value))}
              className="w-full accent-signal-yes cursor-pointer h-2 bg-ground rounded-lg"
            />
          </div>
        </div>

        {/* Composite Score Pill */}
        <div className="p-3 bg-ground border border-subtle rounded-xl flex items-center justify-between text-xs font-mono">
          <span className="text-text-muted">Weighted Composite Score:</span>
          <span className="text-base font-bold text-text-primary">
            {compositeScore} / 10.0
          </span>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
            Committee Action State
          </label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as OpportunitySubmission['triageStatus'])}
            className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-xs font-mono font-semibold text-text-primary focus:outline-none focus:border-ef-violet"
          >
            <option value="Awaiting Review">Awaiting Review</option>
            <option value="In Committee Triage">In Committee Triage</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Selected">Selected for Grant Award</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
            Committee Confidential Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-xs text-text-primary focus:outline-none focus:border-ef-violet"
          />
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-elevated"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2.5 px-5 rounded-xl text-xs font-mono font-bold uppercase bg-ef-violet text-white hover:bg-ef-violet-hover shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Sign &amp; Save Evaluation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
