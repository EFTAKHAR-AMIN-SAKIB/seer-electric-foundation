import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export const StressTestSimulator: React.FC = () => {
  const [simulatedLoss, setSimulatedLoss] = useState<number>(35);
  const coveredCapital = 100000;
  const cutoffPercent = 25; // Tier 2 cutoff

  const isTriggered = simulatedLoss >= cutoffPercent;
  const investorLossWithoutHedge = (coveredCapital * (simulatedLoss / 100));
  const insurancePayout = isTriggered ? investorLossWithoutHedge : 0;
  const netInvestorLoss = investorLossWithoutHedge - insurancePayout;

  return (
    <div className="w-full bg-abyss border border-subtle rounded-3xl p-6 select-none space-y-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-signal-warn" />
          <h3 className="text-base font-bold text-text-primary">
            Real-Time Tail-Risk Stress Test Simulator
          </h3>
        </div>
        <span className="text-xs font-mono text-text-muted">
          Portfolio: $100,000 | Hedge Tier: &gt;25% Slashing/Haircut
        </span>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-text-muted">Simulate Protocol Crisis Drawdown:</span>
          <span className="font-bold text-signal-no text-sm">
            -{simulatedLoss}% Drawdown
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={simulatedLoss}
          onChange={e => setSimulatedLoss(parseInt(e.target.value))}
          className="w-full accent-signal-no cursor-pointer h-2.5 bg-ground rounded-lg"
        />
        <div className="flex justify-between text-[10px] font-mono text-text-muted">
          <span>0% (Normal Operations)</span>
          <span className="text-signal-warn">25% (Hedge Cutoff Trigger)</span>
          <span>100% (Complete Vault Insolvency)</span>
        </div>
      </div>

      {/* Outcome Waterfall */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-card border border-subtle font-mono text-xs">
        <div>
          <div className="text-text-muted">Unhedged Portfolio Loss:</div>
          <div className="text-lg font-bold text-signal-no mt-1">
            -${investorLossWithoutHedge.toLocaleString()}
          </div>
          <div className="text-[10px] text-text-muted">Based on -{simulatedLoss}% event</div>
        </div>

        <div>
          <div className="text-text-muted">Seer CTF Payout Waterfall:</div>
          <div className={`text-lg font-bold mt-1 ${isTriggered ? 'text-signal-yes' : 'text-text-muted'}`}>
            {isTriggered ? `+$${insurancePayout.toLocaleString()} sDAI` : '$0 (Below 25% Cutoff)'}
          </div>
          <div className="text-[10px] text-text-muted">
            {isTriggered ? 'Escrow Released Instantly' : 'No payout triggered'}
          </div>
        </div>

        <div>
          <div className="text-text-muted">Net Protected Loss:</div>
          <div className="text-lg font-bold text-text-primary mt-1">
            ${netInvestorLoss.toLocaleString()}
          </div>
          <div className="text-[10px] text-signal-yes">
            {isTriggered ? '100% Covered by Seer Hedge' : 'Minor variance retained'}
          </div>
        </div>
      </div>
    </div>
  );
};
