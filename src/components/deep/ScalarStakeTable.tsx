import React, { useState } from 'react';
import { DeepProjectNode } from '../../types';
import { Sliders, ShieldCheck, TrendingUp, Cpu, UserCheck, ArrowRight, Check } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import confetti from 'canvas-confetti';

interface ScalarStakeTableProps {
  nodes: DeepProjectNode[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}

export const ScalarStakeTable: React.FC<ScalarStakeTableProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode
}) => {
  const { wallet, showToast } = useWallet();
  const { playChime } = useSound();

  // Local weights state for interactive calibration
  const [calibratedWeights, setCalibratedWeights] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    nodes.forEach(n => {
      initial[n.id] = n.weight;
    });
    return initial;
  });

  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Re-balancing algorithm to conserve sum = 1.000
  const handleSliderChange = (targetId: string, newVal: number) => {
    setCalibratedWeights(prev => {
      const oldVal = prev[targetId] || 0.1;
      const delta = newVal - oldVal;
      const otherKeys = Object.keys(prev).filter(k => k !== targetId);
      const otherSum = otherKeys.reduce((acc, k) => acc + prev[k], 0);

      const next = { ...prev, [targetId]: newVal };

      if (otherSum > 0) {
        otherKeys.forEach(k => {
          const proportion = prev[k] / otherSum;
          next[k] = Math.max(0.01, +(prev[k] - delta * proportion).toFixed(3));
        });
      }

      // Final pass normalization
      const total = Object.values(next).reduce((a, b) => a + b, 0);
      Object.keys(next).forEach(k => {
        next[k] = +(next[k] / total).toFixed(3);
      });

      return next;
    });
  };

  const handleStakeCalibration = () => {
    if (wallet.balances.sDAI < stakeAmount) {
      showToast('Insufficient sDAI', 'Use the Faucet in header to claim 1,000 sDAI.', 'warn');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7D33FF', '#00F59B', '#06B6D4']
      });
      playChime('success');
      showToast(
        'Juror Calibration Staked!',
        `Committed $${stakeAmount} sDAI into the Deep Evaluation Round. Juror yield accrues at 5.2% APY + accuracy bounty.`,
        'success'
      );
    }, 500);
  };

  const sumWeights = Object.values(calibratedWeights).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full bg-card border border-subtle rounded-3xl p-6 select-none space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-ef-violet" />
            <h3 className="text-base font-bold text-text-primary">
              Multi-Scalar Juror Calibration Terminal
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Adjust project allocation weights. Conservation invariant guarantees $\sum W_j = 1.000$ (100.0%).
          </p>
        </div>

        {/* Sum Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-text-muted">Total Cohort Allocation:</span>
          <span className="px-2.5 py-1 rounded-full bg-signal-yes-soft text-signal-yes font-bold border border-signal-yes/30">
            {(sumWeights * 100).toFixed(1)}% (1.000)
          </span>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {nodes.map(node => {
          const currentWeight = calibratedWeights[node.id] ?? node.weight;
          const isSelected = selectedNodeId === node.id;
          const divergence = ((currentWeight - node.aiScore) * 100).toFixed(1);
          const isHumanHigher = currentWeight >= node.aiScore;

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-elevated border-ef-violet shadow-md'
                  : 'bg-ground/70 border-subtle hover:border-ef-violet/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-ef-violet uppercase px-1.5 py-0.5 rounded bg-ef-violet-soft border border-ef-violet/20">
                      {node.symbol}
                    </span>
                    <h4 className="text-sm font-bold text-text-primary">
                      {node.name}
                    </h4>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-1">{node.description}</p>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] text-text-muted uppercase">Originality Score</div>
                    <div className="font-bold text-signal-yes">{(node.originalityScore * 100).toFixed(0)} / 100</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-text-muted uppercase">Juror Weight</div>
                    <div className="font-bold text-text-primary text-sm">
                      {(currentWeight * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider & AI Comparison Bar */}
              <div className="space-y-2 pt-2 border-t border-subtle">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-text-muted shrink-0 w-16">
                    Stake Calib:
                  </span>
                  <input
                    type="range"
                    min="0.02"
                    max="0.50"
                    step="0.005"
                    value={currentWeight}
                    onChange={e => handleSliderChange(node.id, parseFloat(e.target.value))}
                    className="flex-1 accent-ef-violet cursor-pointer h-2 bg-ground rounded-lg"
                  />
                  <span className="text-xs font-mono font-bold text-ef-violet w-12 text-right">
                    {(currentWeight * 100).toFixed(1)}%
                  </span>
                </div>

                {/* AI vs Human Divergence Row */}
                <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-signal-cyan" />
                    <span>AI Seed: {(node.aiScore * 100).toFixed(1)}%</span>
                  </div>
                  <div className={`flex items-center gap-1 font-semibold ${isHumanHigher ? 'text-signal-yes' : 'text-signal-no'}`}>
                    <span>Human Divergence Δ:</span>
                    <span>{isHumanHigher ? '+' : ''}{divergence}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stake & Submission Bar */}
      <div className="pt-4 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 bg-ground/50 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-signal-yes shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-text-primary">Staked Juror Calibration Ticket</div>
            <div className="text-text-muted font-mono text-[11px]">
              Available: ${wallet.balances.sDAI.toFixed(2)} sDAI (Yields 5.2% APY while locked)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-muted">$</span>
            <input
              type="number"
              min="10"
              step="50"
              value={stakeAmount}
              onChange={e => setStakeAmount(Math.max(10, parseInt(e.target.value) || 0))}
              className="w-28 pl-6 pr-2 py-2 bg-card border border-subtle rounded-xl text-xs font-mono font-bold text-text-primary focus:outline-none focus:border-ef-violet"
            />
          </div>

          <button
            onClick={handleStakeCalibration}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none py-2 px-4 rounded-xl text-xs font-bold font-mono uppercase bg-ef-violet text-white hover:bg-ef-violet-hover shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? (
              <span>Signing Stake...</span>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Submit Juror Stake</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
