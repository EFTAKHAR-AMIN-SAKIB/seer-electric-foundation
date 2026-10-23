import React, { useState } from 'react';
import { FutarchyOverview } from '../components/futarchy/FutarchyOverview';
import { ProposalCard } from '../components/futarchy/ProposalCard';
import { ConditionalTradeWidget } from '../components/futarchy/ConditionalTradeWidget';
import { ZodiacCalldataInspector } from '../components/futarchy/ZodiacCalldataInspector';
import { MOCK_FUTARCHY_PROPOSALS } from '../data/mockFutarchy';
import { FutarchyProposal } from '../types';

export const FutarchyPage: React.FC = () => {
  const [proposals, setProposals] = useState<FutarchyProposal[]>(MOCK_FUTARCHY_PROPOSALS);
  const [tradeModal, setTradeModal] = useState<{ proposal: FutarchyProposal | null; branch: 'PASS' | 'FAIL' }>({
    proposal: null,
    branch: 'PASS'
  });
  const [inspectModal, setInspectModal] = useState<FutarchyProposal | null>(null);

  const handleTradeBranch = (proposal: FutarchyProposal, branch: 'PASS' | 'FAIL') => {
    setTradeModal({ proposal, branch });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-8">
      {/* Intro Overview */}
      <FutarchyOverview />

      {/* Active Proposals Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-text-primary tracking-tight">
              Active Conditional Governance Proposals
            </h2>
            <p className="text-xs text-text-secondary font-mono mt-0.5">
              Dual prediction markets (IF PASS vs IF FAIL) • Unchosen branch receives 100% refund
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono bg-card border border-subtle text-text-muted">
            {proposals.length} Proposals in Decision Window
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {proposals.map(proposal => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onTradeBranch={handleTradeBranch}
              onInspectZodiac={setInspectModal}
            />
          ))}
        </div>
      </div>

      {/* Conditional Trade Ticket Modal */}
      {tradeModal.proposal && (
        <ConditionalTradeWidget
          proposal={tradeModal.proposal}
          branch={tradeModal.branch}
          onClose={() => setTradeModal({ proposal: null, branch: 'PASS' })}
        />
      )}

      {/* Zodiac Calldata Inspector Modal */}
      {inspectModal && (
        <ZodiacCalldataInspector
          proposal={inspectModal}
          onClose={() => setInspectModal(null)}
        />
      )}
    </div>
  );
};
