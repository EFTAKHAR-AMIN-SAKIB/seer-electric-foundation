import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';
import { FutarchyProposal } from '../../types';

interface ZodiacCalldataInspectorProps {
  proposal: FutarchyProposal | null;
  onClose: () => void;
}

export const ZodiacCalldataInspector: React.FC<ZodiacCalldataInspectorProps> = ({
  proposal,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!proposal) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal.autoExecuteCalldata);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-card border border-subtle rounded-3xl p-6 shadow-2xl space-y-4">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ef-violet-soft border border-ef-violet/30 flex items-center justify-center text-ef-violet">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">
              Zodiac Safe Module Calldata Inspector
            </h3>
            <p className="text-xs text-text-secondary font-mono">
              Deterministic Autonomous Execution for {proposal.code}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs font-mono">
          <div>
            <div className="text-text-muted mb-1">Target Contract (Safe / Governor):</div>
            <div className="p-2.5 bg-ground border border-subtle rounded-xl text-text-primary break-all">
              {proposal.targetContract}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-text-muted mb-1">
              <span>Encoded Execution Calldata (ABI Payload):</span>
              <button
                onClick={handleCopy}
                className="text-ef-violet hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-signal-yes" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Payload'}</span>
              </button>
            </div>
            <div className="p-3 bg-ground border border-subtle rounded-xl text-signal-cyan break-all max-h-36 overflow-y-auto leading-relaxed">
              {proposal.autoExecuteCalldata}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-ef-violet-soft/60 border border-ef-violet/30 text-[11px] text-text-secondary leading-relaxed">
            <strong>Autonomous Settlement Guarantee:</strong> When the Reality.eth escalation timeout elapses and Kleros confirms that <span className="text-text-primary font-bold">Δ({proposal.metricDeltaPercent.toFixed(1)}%) &gt; {proposal.decisionThresholdPercent}%</span>, the Zodiac Reality module invokes this payload directly on Gnosis Chain Safe with zero human multisig signer intervention.
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-mono font-bold bg-ground border border-subtle text-text-primary hover:bg-elevated"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
