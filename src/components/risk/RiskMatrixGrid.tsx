import React, { useState } from 'react';
import { RiskProtocol, RiskSeverityTier } from '../../types';
import { ShieldAlert, Layers, ExternalLink, Zap, ArrowRight } from 'lucide-react';

interface RiskMatrixGridProps {
  protocols: RiskProtocol[];
  onSelectHedge: (protocol: RiskProtocol, tier: RiskSeverityTier) => void;
}

type Horizon = '30d' | '90d' | '180d' | '365d';

export const RiskMatrixGrid: React.FC<RiskMatrixGridProps> = ({
  protocols,
  onSelectHedge
}) => {
  const [horizon, setHorizon] = useState<Horizon>('365d');

  const getProbForHorizon = (tier: RiskSeverityTier, h: Horizon) => {
    switch (h) {
      case '30d': return tier.impliedProb30d;
      case '90d': return tier.impliedProb90d;
      case '180d': return tier.impliedProb180d;
      case '365d': return tier.impliedProb365d;
    }
  };

  const getCellColor = (prob: number) => {
    if (prob < 0.5) return 'bg-signal-yes-soft text-signal-yes border-signal-yes/30';
    if (prob < 2.0) return 'bg-signal-warn-soft text-signal-warn border-signal-warn/30';
    return 'bg-signal-no-soft text-signal-no border-signal-no/30';
  };

  return (
    <div className="w-full bg-card border border-subtle rounded-3xl p-6 select-none space-y-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-signal-warn" />
            <h3 className="text-base font-bold text-text-primary">
              2D Cross-Protocol Tail-Risk Pricing Surface
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5 font-mono">
            Annualized implied default probabilities &amp; underwriting premiums in sDAI
          </p>
        </div>

        {/* Time Horizon Selector */}
        <div className="flex items-center gap-1 p-1 bg-ground rounded-xl border border-subtle font-mono text-xs overflow-x-auto no-scrollbar max-w-full">
          <span className="text-text-muted px-2 hidden sm:inline">Horizon:</span>
          {(['30d', '90d', '180d', '365d'] as Horizon[]).map(h => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 rounded-lg uppercase font-semibold transition-colors shrink-0 ${
                horizon === h
                  ? 'bg-ef-violet text-white shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="sm:hidden px-3 py-1.5 bg-ground text-[10px] font-mono text-text-muted flex items-center justify-between rounded-xl border border-subtle">
        <span>← Swipe horizontally to view 4 risk tiers →</span>
        <span className="text-ef-violet font-bold">Tap cell to hedge</span>
      </div>

      {/* Responsive Matrix Grid */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-subtle bg-ground/80 text-[11px] uppercase text-text-muted">
              <th className="py-3 px-4 font-semibold min-w-[200px]">Protocol / Asset</th>
              <th className="py-3 px-4 font-semibold">Tier 1 (&gt;10% Haircut)</th>
              <th className="py-3 px-4 font-semibold">Tier 2 (&gt;25% Slashing)</th>
              <th className="py-3 px-4 font-semibold">Tier 3 (&gt;50% Insolvency)</th>
              <th className="py-3 px-4 font-semibold">Tier 4 (&gt;90% Black Swan)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {protocols.map(prot => (
              <tr key={prot.id} className="hover:bg-elevated/40 transition-colors">
                {/* Protocol Info */}
                <td className="py-4 px-4 font-sans">
                  <div className="font-bold text-text-primary text-sm">
                    {prot.name}
                  </div>
                  <div className="text-[11px] font-mono text-text-muted flex items-center gap-2 mt-0.5">
                    <span>TVL ${(prot.tvlUsd / 1000000000).toFixed(1)}B</span>
                    <span>•</span>
                    <span className="text-signal-yes">Base APY: {prot.baseYieldApy}%</span>
                  </div>
                </td>

                {/* 4 Severity Tiers */}
                {prot.tiers.map((tier, idx) => {
                  const prob = getProbForHorizon(tier, horizon);
                  return (
                    <td key={idx} className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => onSelectHedge(prot, tier)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all hover:scale-105 active:scale-95 group ${getCellColor(prob)}`}
                        title={`Click to configure hedge for ${prot.name} (${tier.severityLabel})`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{prob.toFixed(2)}%</span>
                          <span className="text-[10px] font-mono opacity-80 group-hover:underline">
                            Hedge →
                          </span>
                        </div>
                        <div className="text-[10px] font-mono opacity-80 mt-0.5">
                          Cap: ${(tier.capacityUsd / 1000000).toFixed(0)}M
                        </div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted pt-2 border-t border-subtle">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-signal-yes" /> Safe (&lt;0.5%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-signal-warn" /> Moderate (0.5% - 2.0%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-signal-no" /> Elevated (&gt;2.0%)
          </span>
        </div>
        <span>Click any cell to synthesize an immediate hedge order</span>
      </div>
    </div>
  );
};
